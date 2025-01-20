// import { ErrorEnum } from '@/constants/httpMessage';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisCacheService } from '@/modules/redis-cache/redis-cache.service';
import { LoginDto } from './dto/auth.dto';
import { AjaxResultService } from '../ajax-responese/ajaxResponse.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CryptoService } from '@/utils/crypto.util';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
    private readonly r: AjaxResultService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
  ) {
    const secret = configService.get('jwt').secret;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //校验逻辑token 已封装
      ignoreExpiration: false,
      secretOrKey: secret,
      // validate函数第一个参数返回req请求对象
      passReqToCallback: true,
    });
  }

  /** @des 用户登陆 */
  async login(loginDto: LoginDto, session) {
    const { mobile, password, username, captcha } = loginDto;
    //get方式获取的验证码定义的
    const sessionCode = String(session.code).toLowerCase();
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
    const token = this.getToken({ id, username, mobile });
    // 存入redis缓存
    this.redisCacheService.set(
      String(id),
      token,
      this.configService.get('jwt').expiration,
    );
    // 返回token
    return this.r.success({ token }, '登录成功');
  }

  /** @des 生成token */
  getToken(payload: any): string {
    return this.jwt.sign(payload);
  }

  /** @des 验证token */
  async validate(req, payload) {
    const { id } = payload;
    // 传入的token
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    //从redis中取对应的token
    const cacheToken = await this.redisCacheService.get(id); //取不出来，说明已过期
    //1.redis中没有token
    if (!cacheToken) {
      throw new UnauthorizedException('token已过期');
    }
    //2.token不同的话，则在其他地方登录
    if (token != cacheToken) {
      throw new UnauthorizedException('该账号已在其他地方登录');
    }
    // token续传,通过重置redis过期时间
    this.redisCacheService.set(
      id,
      token,
      this.configService.get('jwt').expiration,
    );
    // token
    return { id: payload.id, username: payload.username };
  }
}
