import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import config from '@/config';

import { AuthModule } from '@/modules/system/auth/auth.module';
import { ConstantsProvider } from '@/constants/constants.provider';
import { UserModule } from '@/modules/system/user/user.module';
import { SysMenuModule } from '@/modules/system/menu/menu.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { DepartmentModule } from './modules/system/department/department.module';
import { RoleModule } from './modules/system/role/role.module';

@Global()
@Module({
  imports: [
    ...config,
    AuthModule,
    UserModule,
    SysMenuModule,
    DepartmentModule,
    RoleModule,
  ],
  controllers: [],
  providers: [ConstantsProvider],
  exports: [ConstantsProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
