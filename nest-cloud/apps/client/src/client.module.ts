import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from '@libs/shared';
import bootstraps from './bootstraps';
import { DepartmentController } from './controllers/department.controller';
import { MenuController } from './controllers/menu.controller';
import { RoleController } from './controllers/role.controller';
import { AllExceptionsFilter } from './filters/httpException.filter';

@Module({
  imports: [...bootstraps, SharedModule, AuthModule],
  controllers: [
    UserController,
    DepartmentController,
    MenuController,
    RoleController,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ClientModule {}
