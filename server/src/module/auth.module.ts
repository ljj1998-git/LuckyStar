import { Module } from '@nestjs/common';
import { AuthController } from '@/controller/auth.controller';
import { AuthService } from '@/service/auth.service';
import { AuthDao } from '@/dao/auth.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasbinRule } from '@/entities/casbin_rule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CasbinRule]), // 导入 TypeORM 模块和 User 实体
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDao],
  exports: [AuthService],
})
export class AuthModule {}
