import { JwtAuthGuard } from '@client/guards/JwtAuth.guard';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { CreateMenuDto } from '@libs/shared/dtos/menu.dto';
import { CreateRoleDto, QueryRoleDto } from '@libs/shared/dtos/role.dto';
import { CustomRequest } from '@libs/shared/types/customRequest';
import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('系统角色管理')
@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @ApiOperation({ summary: '新增角色' })
  @Post('/create')
  createRole(@Body() createRoleReq: CreateRoleDto, @Req() req: CustomRequest) {
    return this.userService.send('role/create', {
      createRoleReq,
      user: req.user,
    });
  }

  @ApiOperation({ summary: '获取角色列表' })
  @Post('/list')
  getRoleList(@Body() createRoleReq: QueryRoleDto) {
    return this.userService.send('role/list', createRoleReq);
  }

  @ApiOperation({ summary: '删除角色' })
  @Post('/delete')
  deleteRole(@Body() roleId: IdDto) {
    return this.userService.send('role/delete', roleId);
  }

  @ApiOperation({ summary: '更新角色' })
  @Post('/update')
  updateRole(@Body() createMenuDto: CreateMenuDto, @Req() req: CustomRequest) {
    return this.userService.send('role/update', {
      createMenuDto,
      user: req.user,
    });
  }
}
