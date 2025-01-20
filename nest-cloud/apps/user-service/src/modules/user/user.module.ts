import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from '@libs/shared/utils/crypto.util';
import { AuthModule } from 'apps/client/src/modules/auth/auth.module';
import { RedisCacheModule } from '@libs/shared/modules/redis-cache/redis-cache.module';
import entities from '@libs/shared/entities';
const [UserEntity, RoleEntity, DepartmentEntity] = entities;

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, DepartmentEntity]),
    AuthModule,
    RedisCacheModule, // 导入Redis模块
  ],
  controllers: [UserController],
  providers: [UserService, CryptoService],
  exports: [],
})
export class UserModule {}
