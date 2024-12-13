import { ConstantsProvider } from '@/constants/constants.provider';
import {
  LoginDto,
  QueryUserListReq,
  RegisterDto,
} from '@/modules/system/user/dto/user.req';
import { UserEntity } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AuthService } from '@/modules/system/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '@/common/modules/redis-cache/redis-cache.service';
import * as svgCaptcha from 'svg-captcha';
import { CryptoService } from '@/util/crypto.util';
import { AjaxResultService } from '@/common/modules/ajax-responese/ajaxResponse.service';

@Injectable()
export class UserService {
  constructor(
    private readonly constants: ConstantsProvider,
    private readonly configService: ConfigService,
    private readonly r: AjaxResultService,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private readonly redisCacheService: RedisCacheService,
    private readonly cryptoService: CryptoService,
  ) {}
  /** 用户注册 */
  async register(registerDto: RegisterDto) {
    const { username, password, mobile } = registerDto;

    const r1 = await this.userEntity.findOneBy({ username });
    if (r1) {
      return this.r.error('当前用户名已注册');
    }
    const r2 = await this.userEntity.findOneBy({ mobile });
    if (r2) {
      return this.r.error('当前手机号已注册');
    }
    try {
      await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          username,
          password: await this.cryptoService.careatePassword(
            await this.cryptoService.decryptPassword(password),
          ),
          mobile,
        })
        .execute();
      return this.r.success(null, '用户注册成功');
    } catch {
      return this.r.error('用户注册失败');
    }
  }

  async login(loginDto: LoginDto, session) {
    const { mobile, password, username, captcha } = loginDto;
    //get方式获取的验证码定义的
    const sessionCode = String(session.code).toLowerCase();
    if (sessionCode !== captcha) {
      return this.r.error('验证码错误');
    }
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
      this.configService.get('jwt').expiration,
    );
    // 返回token
    return this.r.success({ token }, '登录成功');
  }

  /**
   * 获取验证码
   */
  async getCaptcha(session) {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 50,
      width: 110,
      height: 38,
      background: '#fff', //背景颜色
    });
    session.code = captcha.text; //session保存验证码
    return this.r.success(captcha.data);
  }

  /**
   * 获取用户列表
   */
  async getUserList(params: QueryUserListReq) {
    const { pageNum, pageSize, username = '', status } = params;
    try {
      const [result, total] = await this.userEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: {
          username: ILike('%' + username + '%'),
          status,
        },
      });
      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
