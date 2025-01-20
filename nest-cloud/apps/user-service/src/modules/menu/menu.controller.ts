import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from '@libs/shared/dtos/menu.dto';
import { CustomRequest } from '@libs/shared/types/customRequest';
import { IdDto } from '@libs/shared/dtos/common.dto';

@Controller('menu')
export class MenuController {
  constructor(public readonly menuService: MenuService) {}

  /** @desc 新增菜单 */
  @MessagePattern('menu/create')
  createMenu(params: { createMenuDto: CreateMenuDto; req: CustomRequest }) {
    const { createMenuDto, req } = params;
    return this.menuService.createMenu(createMenuDto, req);
  }

  /** @desc 删除菜单 */
  @MessagePattern('menu/delete')
  deleteMenu(params: { idDto: IdDto; req: CustomRequest }) {
    const { idDto, req } = params;
    return this.menuService.deleteMenu(idDto, req);
  }

  /** @desc 更新菜单 */
  @MessagePattern('menu/update')
  updateMenu(params: { updateMenuDto: UpdateMenuDto; req: CustomRequest }) {
    const { updateMenuDto, req } = params;
    return this.menuService.updateMenu(updateMenuDto, req);
  }

  /** @desc 获取菜单列表 */
  @MessagePattern('menu/queryTree')
  getMenuList() {
    return this.menuService.getMenuTree();
  }

  /** @desc 获取菜单详情 */
  @MessagePattern('menu/info')
  getMenuInfo(idDto: IdDto) {
    return this.menuService.getMenuInfo(idDto);
  }
}
