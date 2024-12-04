import { Module } from '@nestjs/common';
import { AuthController } from '@/controller/auth.controller';
import { AuthService } from '@/service/auth.service';
import { AuthDao } from '@/dao/auth.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasbinRule } from '@/entities/casbin_rule.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CasbinRule]), // 导入 TypeORM 模块和 User 实体
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: '55', //jwt密钥
          signOptions: { expiresIn: '600000s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDao],
  exports: [AuthService],
})
export class AuthModule {}
