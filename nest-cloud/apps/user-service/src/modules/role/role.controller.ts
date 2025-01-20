import { CreateRoleDto, QueryRoleDto } from '@libs/shared/dtos/role.dto';
import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';
import { CustomRequest } from '@libs/shared/types/customRequest';
import { MessagePattern } from '@nestjs/microservices';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { CreateMenuDto } from '@libs/shared/dtos/menu.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /** @desc 新增角色 */
  @MessagePattern('role/create')
  createRole(params: { createRoleReq: CreateRoleDto; req: CustomRequest }) {
    const { createRoleReq, req } = params;
    return this.roleService.createRole(createRoleReq, req);
  }

  /** @desc 获取角色列表 */
  @MessagePattern('role/list')
  getRoleList(createRoleReq: QueryRoleDto) {
    return this.roleService.getRoleList(createRoleReq);
  }

  /** @desc 删除角色 */
  @MessagePattern('role/delete')
  deleteRole(roleId: IdDto) {
    return this.roleService.deleteRole(roleId);
  }

  /** @desc 更新角色 */
  @MessagePattern('role/update')
  updateRole(params: { createMenuDto: CreateMenuDto; req: CustomRequest }) {
    const { createMenuDto, req } = params;
    return this.roleService.updateRole(createMenuDto, req);
  }
}
