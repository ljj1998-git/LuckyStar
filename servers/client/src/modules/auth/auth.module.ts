import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheModule } from '@/modules/redis-cache/redis-cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AjaxResultjaxResponesModule } from '../ajax-responese/ajaxRespones.module';
import { CryptoService } from '@/utils/crypto.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('jwt').secret;
        const expiration = configService.get('jwt').expiration + 's';
        return {
          secret: secret, //jwt密钥
          signOptions: { expiresIn: expiration },
        };
      },
      inject: [ConfigService],
    }),
    RedisCacheModule,
    AjaxResultjaxResponesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
  exports: [AuthService],
})
export class AuthModule {}
