import {
  CreateMenuDto,
  QueryMenuInfoDto,
  UpdateMenuDto,
} from '@libs/shared/dtos/menu.dto';
import { MenuEntity } from '@libs/shared/entities/menu.entity';
import { AjaxResultService } from '@libs/shared/modules/ajax-responese/ajaxResponse.service';
import { CustomRequest } from '@libs/shared/types/customRequest';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getMenuTreeMysql } from './dao/menu.dao';
import { buildTreeByPath } from '@libs/shared/utils/buildTree';

@Injectable()
export class MenuService {
  constructor(
    private readonly r: AjaxResultService,
    @InjectRepository(MenuEntity)
    private menuEntity: Repository<MenuEntity>,
  ) {}

  /** 创建菜单 */
  async createMenu(createMenuReq: CreateMenuDto, req: CustomRequest) {
    const { username } = req.user;

    try {
      this.menuEntity
        .createQueryBuilder()
        .insert()
        .into(MenuEntity)
        .values({
          ...createMenuReq,
          createdBy: username,
        })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取菜单树 */
  async getMenuTree() {
    try {
      const res = await this.menuEntity.query(getMenuTreeMysql());
      // 原生query需要转换
      const tree = buildTreeByPath(res);
      return this.r.success(tree);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 更新菜单 */
  async updateMenu(updateMenuReq: UpdateMenuDto, req: CustomRequest) {
    const { id } = updateMenuReq;
    const { username } = req.user;

    try {
      await this.menuEntity
        .createQueryBuilder()
        .update(MenuEntity)
        .set({
          ...updateMenuReq,
          updatedBy: username,
          updatedAt: new Date(),
        })
        .where('id = :id', { id })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 删除菜单 */
  async deleteMenu(params: QueryMenuInfoDto, req: CustomRequest) {
    const { id } = params;
    const { username } = req.user;

    try {
      const res = await this.menuEntity.query(getMenuTreeMysql());
      const ids = res
        .filter((item) => item.path.includes(id))
        .map((item) => item.id);
      await this.menuEntity
        .createQueryBuilder()
        .update(MenuEntity)
        .set({
          isDeleted: 1,
          updatedBy: username,
          updatedAt: new Date(),
        })
        .where('id IN (:...ids)', { ids })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取菜单详情 */
  async getMenuInfo(params: QueryMenuInfoDto) {
    console.log('params', params);

    const { id } = params;
    try {
      const res = await this.menuEntity.findOneBy({ id });
      if (!res) {
        return this.r.error('菜单不存在');
      }
      return this.r.success(res);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
