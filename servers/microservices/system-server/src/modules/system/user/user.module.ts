import { Module } from '@nestjs/common';
import { UserController } from '@/modules/system/user/user.controller';
import { UserService } from '@/modules/system/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AjaxResultService } from '@/modules/ajax-responese/ajaxResponse.service';
// import { AuthModule } from '@/modules/system/auth/auth.module';
// import { RedisCacheModule } from '@/common/modules/redis-cache/redis-cache.module';
// import { CryptoService } from '@/util/crypto.util';
// import { RoleModule } from '../role/role.module';
// import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // AuthModule,
    // RedisCacheModule, // 导入Redis模块
    // RoleModule,
    // DepartmentModule,
  ],
  controllers: [UserController],
  providers: [UserService, AjaxResultService],
  exports: [],
})
export class UserModule {}
