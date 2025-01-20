import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '@libs/shared/modules/redis-cache/redis-cache.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET_KEY');
        const expiration = configService.get('JWT_EXPIRATION_TIME') + 's';
        return {
          secret: secret, //jwt密钥
          signOptions: { expiresIn: expiration },
        };
      },
      inject: [ConfigService],
    }),
    RedisCacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
