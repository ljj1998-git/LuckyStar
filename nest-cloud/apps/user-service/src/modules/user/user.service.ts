import {
  BindRoleDto,
  LoginDto,
  QueryUserListReq,
  RegisterDto,
  UpdateUserDto,
} from '@libs/shared/dtos/user.dto';
import { UserEntity } from '@libs/shared/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { CustomUser } from '@libs/shared/types/customRequest';
import { AjaxResultService } from '@libs/shared/modules/ajax-responese/ajaxResponse.service';
import * as svgCaptcha from 'svg-captcha';
import { CryptoService } from '@libs/shared/utils/crypto.util';
import { DepartmentEntity } from '@libs/shared/entities/department.entity';
import { RedisCacheService } from '@libs/shared/modules/redis-cache/redis-cache.service';
import { AuthService } from '@client/modules/auth/auth.service';
import { IdsDto } from '@libs/shared/dtos/common.dto';
import { RoleEntity } from '@libs/shared/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly redisCacheService: RedisCacheService,
    private readonly r: AjaxResultService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private roleEntity: Repository<RoleEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentEntity: Repository<DepartmentEntity>,
    private readonly configService: ConfigService,
  ) {} //

  /** @des 获取验证码 */
  async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 50,
      width: 110,
      height: 38,
      background: '#fff', //背景颜色
    });
    return this.r.success(captcha.data);
  }

  /** @des 用户注册 */
  async register(registerDto: RegisterDto, req: CustomUser) {
    const { username } = req;
    const { password, ...otherParams } = registerDto;

    const r1 = await this.userEntity.findOneBy({ mobile: otherParams.mobile });
    if (r1) {
      return this.r.error('当前手机号已注册');
    }
    try {
      const department = await this.departmentEntity.findOneBy({
        id: otherParams.departmentId,
      });
      await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          ...otherParams,
          password: await this.cryptoService.careatePassword(
            await this.cryptoService.decryptPassword(password),
          ),
          department: department,
          createdBy: username,
        })
        .execute();
      return this.r.success(null, '用户注册成功');
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 用户登录 */
  async login(loginDto: LoginDto) {
    const { mobile, password, username, captcha } = loginDto;
    //get方式获取的验证码定义的
    // console.log(session);

    // const sessionCode = String(session.code).toLowerCase();
    // if (sessionCode !== captcha) {
    //   return this.r.error('验证码错误');
    // }
    const r1 = await this.userEntity.findOne({
      where: { username },
      select: ['password', 'id', 'mobile'],
    });
    if (!r1) {
      return this.r.error('用户不存在');
    }
    // 校验密码
    const passwordSame = await this.cryptoService.checkPassword(
      password,
      r1.password,
    );

    if (!passwordSame) {
      return this.r.error('密码错误');
    }
    const { id } = r1;
    const token = this.authService.getToken({ id, username, mobile });
    // 存入redis缓存
    this.redisCacheService.set(
      String(id),
      token,
      this.configService.get('JWT_EXPIRATION_TIME'),
    );
    // 返回token
    return this.r.success({ token }, '登录成功');
  }

  /** @des 更新用户 */
  async updateUser(params: UpdateUserDto, req: CustomUser) {
    const { roleIds, departmentId } = params;
    const { username } = req;
    try {
      const roles = await this.roleEntity.findBy({ id: In(roleIds) });
      const department = await this.departmentEntity.findOneBy({
        id: departmentId,
      });

      await this.userEntity.save({
        ...params,
        roles,
        department,
        updatedBy: username,
      });
      return this.r.success(null, '用户更新成功');
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 获取用户列表 */
  async getUserList(params: QueryUserListReq) {
    const { pageNum, pageSize, username = '', status, departmentId } = params;
    try {
      const [result, total] = await this.userEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: {
          username: ILike('%' + username + '%'),
          status,
          isDeleted: 0,
          department: {
            id: departmentId,
          },
        },
        relations: ['roles', 'department'],
      });

      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 获取用户详情 */
  async getUserInfo(id: number) {
    try {
      const user = await this.userEntity
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.department', 'department')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.id = :id', { id })
        .getOne();

      const { department, roles, ...otherRes } = user;
      console.log(user);

      const _user = {
        ...otherRes,
        departmentId: department?.id,
        roleIds: roles.map((item) => item.id),
      };
      return this.r.success(_user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 删除用户 */
  async deleteUser(params: IdsDto, req: CustomUser) {
    const { ids } = params;
    const { username } = req;
    try {
      await this.userEntity
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          isDeleted: 1,
          updatedBy: username,
          updatedAt: new Date(),
        })
        .where('id IN (:...ids)', { ids })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 绑定角色 */
  async bindRole(params: BindRoleDto) {
    const { userId, roleIds } = params;
    try {
      const user = await this.userEntity.findOne({
        where: { id: userId },
        relations: ['roles'],
      });
      const roles = await this.roleEntity.findBy({
        id: In(roleIds),
      });
      user.roles = roles;
      await this.userEntity.save(user);
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @des 获取已绑定角色 */
  async getBindRole(id: number) {
    try {
      const user = await this.userEntity.findOne({
        where: { id },
        relations: ['roles'],
      });
      const roleIds = user.roles.map((item) => item.id);
      return this.r.success(roleIds);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
