import { HttpMessageEnum } from '@/constants/httpMessage';
import { RegisterDto } from '@/modules/system/user/dto/user.req';
import { UserEntity } from './entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { AjaxResultService } from '@/modules/ajax-responese/ajaxResponse.service';
import { ConfigService } from '@nestjs/config';
// import { AuthService } from '@/modules/system/auth/auth.service';
// import { RedisCacheService } from '@/common/modules/redis-cache/redis-cache.service';
// import { CryptoService } from '@/util/crypto.util';
// import { AjaxResultService } from '@/common/modules/ajax-responese/ajaxResponse.service';
// import { RoleEntity } from '../role/entities/role.entity';
// import { RoleService } from '../role/role.service';
import { CustomRequest } from '@/types/customRequest';
import { GrpcMethod } from '@nestjs/microservices';
// import { DeleteDto } from '@/common/dto/base.dto';
// import { DepartmentEntity } from '../department/entities/department.entity';

@Injectable()
export class UserService {
  constructor(
    // private readonly configService: ConfigService,
    private readonly r: AjaxResultService,
    // @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  /** @des 用户注册 */
  @GrpcMethod('SystemUserService', 'Register')
  async register(registerDto: RegisterDto, req: CustomRequest) {
    // const { username } = req.user;
    // const { password, ...otherParams } = registerDto;

    return this.r.success(null, '注册成功');
    // const r1 = await this.userEntity.findOneBy({ mobile: otherParams.mobile });
    // if (r1) {
    //   return this.r.error('当前手机号已注册');
    // }
    // try {
    //   const department = await this.departmentEntity.findOneBy({
    //     id: otherParams.departmentId,
    //   });
    //   await this.userEntity
    //     .createQueryBuilder()
    //     .insert()
    //     .into(UserEntity)
    //     .values({
    //       ...otherParams,
    //       password: await this.cryptoService.careatePassword(
    //         await this.cryptoService.decryptPassword(password),
    //       ),
    //       department: department,
    //       createdBy: username,
    //     })
    //     .execute();
    //   return this.r.success(null, '用户注册成功');
    // } catch (e) {
    //   throw new HttpException(
    //     e.message,
    //     this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  // /** @des 更新用户 */
  // async updateUser(params: UpdateUserStatusReq, req: CustomRequest) {
  //   const { id, roleIds, departmentId } = params;
  //   const { username } = req.user;
  //   try {
  //     const roles = await this.roleEntity.findBy({ id: In(roleIds) });
  //     const department = await this.departmentEntity.findOneBy({
  //       id: departmentId,
  //     });

  //     await this.userEntity.save({
  //       ...params,
  //       roles,
  //       department,
  //       updatedBy: username,
  //     });
  //     return this.r.success(null, '用户更新成功');
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // /** @des 获取用户列表 */
  // async getUserList(params: QueryUserListReq) {
  //   const { pageNum, pageSize, username = '', status, departmentId } = params;
  //   try {
  //     const [result, total] = await this.userEntity.findAndCount({
  //       skip: (pageNum - 1) * pageSize,
  //       take: pageSize,
  //       where: {
  //         username: ILike('%' + username + '%'),
  //         status,
  //         isDeleted: 0,
  //         department: {
  //           id: departmentId,
  //         },
  //       },
  //       relations: ['roles', 'department'],
  //     });

  //     return this.r.success({
  //       total,
  //       list: result,
  //     });
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // /** @des 获取用户详情 */
  // async getUserInfo(id: number) {
  //   try {
  //     const user = await this.userEntity
  //       .createQueryBuilder('user')
  //       .leftJoinAndSelect('user.department', 'department')
  //       .leftJoinAndSelect('user.roles', 'roles')
  //       .where('user.id = :id', { id })
  //       .getOne();

  //     const { department, roles, ...otherRes } = user;
  //     const _user = {
  //       ...otherRes,
  //       departmentId: department.id,
  //       roleIds: roles.map((item) => item.id),
  //     };
  //     return this.r.success(_user);
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // /** @des 删除用户 */
  // async deleteUser(params: DeleteDto, req: CustomRequest) {
  //   const { ids } = params;
  //   const { username } = req.user;
  //   try {
  //     await this.userEntity
  //       .createQueryBuilder()
  //       .update(UserEntity)
  //       .set({
  //         isDeleted: 1,
  //         updatedBy: username,
  //         updatedAt: new Date(),
  //       })
  //       .where('id IN (:...ids)', { ids })
  //       .execute();
  //     return this.r.success();
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // /** @des 绑定角色 */
  // async bindRole(params: BindRoleDto) {
  //   const { userId, roleIds } = params;
  //   try {
  //     const user = await this.userEntity.findOne({
  //       where: { id: userId },
  //       relations: ['roles'],
  //     });
  //     const roles = await this.roleEntity.findBy({
  //       id: In(roleIds),
  //     });
  //     user.roles = roles;
  //     await this.userEntity.save(user);
  //     return this.r.success();
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // /** @des 获取已绑定角色 */
  // async getBindRole(id: number) {
  //   try {
  //     const user = await this.userEntity.findOne({
  //       where: { id },
  //       relations: ['roles'],
  //     });
  //     const roleIds = user.roles.map((item) => item.id);
  //     return this.r.success(roleIds);
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message,
  //       this.constants.RESPONSE_CODE.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
