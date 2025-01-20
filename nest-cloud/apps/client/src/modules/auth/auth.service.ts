// import { ErrorEnum } from '@/constants/httpMessage';

import { RedisCacheService } from '@libs/shared/modules/redis-cache/redis-cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    const secret = configService.get<string>('JWT_SECRET_KEY');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //校验逻辑token 已封装
      ignoreExpiration: false,
      secretOrKey: secret,
      // validate函数第一个参数返回req请求对象
      passReqToCallback: true,
    });
  }

  /**
   * 生成token
   */
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
      this.configService.get('JWT_EXPIRATION_TIME'),
    );
    // token
    return { id: payload.id, username: payload.username };
  }
}
