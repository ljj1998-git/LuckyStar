import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMenuDto, UpdateMenuDto } from '@libs/shared/dtos/menu.dto';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { JwtAuthGuard } from '@client/guards/JwtAuth.guard';
import { CustomRequest } from '@libs/shared/types/customRequest';

@Controller('menu')
@ApiTags('系统菜单管理')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @Post('/create')
  @ApiOperation({ summary: '新增菜单' })
  createMenu(@Body() createMenuDto: CreateMenuDto, @Req() req: CustomRequest) {
    return this.userService.send('menu/create', {
      createMenuDto,
      user: req.user,
    });
  }

  @Delete('/delete')
  @ApiOperation({ summary: '删除菜单' })
  deleteMenu(@Query() idDto: IdDto, @Req() req: CustomRequest) {
    return this.userService.send('menu/delete', {
      idDto,
      user: req.user,
    });
  }

  @Put('/update')
  @ApiOperation({ summary: '更新菜单' })
  updateMenu(@Body() updateMenuDto: UpdateMenuDto, @Req() req: CustomRequest) {
    return this.userService.send('menu/update', {
      updateMenuDto,
      user: req.user,
    });
  }

  @Get('/queryTree')
  @ApiOperation({ summary: '获取菜单列表' })
  getMenuList() {
    return this.userService.send('menu/queryTree', {});
  }

  /** 获取菜单详情 */
  @Get('/info')
  @ApiOperation({ summary: '获取菜单详情' })
  getMenuInfo(@Query() idDto: IdDto) {
    return this.userService.send('menu/info', idDto);
  }
}
