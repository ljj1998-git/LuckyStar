import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from '@libs/shared';
import bootstraps from './bootstraps';
import { DepartmentModule } from './modules/department/department.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    ...bootstraps,
    UserModule,
    SharedModule,
    DepartmentModule,
    MenuModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
