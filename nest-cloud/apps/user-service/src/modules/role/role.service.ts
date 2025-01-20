import { CreateMenuDto } from '@libs/shared/dtos/menu.dto';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@libs/shared/entities/role.entity';
import { AjaxResultService } from '@libs/shared/modules/ajax-responese/ajaxResponse.service';
import { ILike, Repository } from 'typeorm';
import { CreateRoleDto, QueryRoleDto } from '@libs/shared/dtos/role.dto';
import { CustomRequest } from '@libs/shared/types/customRequest';

@Injectable()
export class RoleService {
  constructor(
    private readonly r: AjaxResultService,
    @InjectRepository(RoleEntity)
    private roleEntity: Repository<RoleEntity>,
  ) {}

  /** 新增角色 */
  async createRole(createRoleReq: CreateRoleDto, req: CustomRequest) {
    const { code } = createRoleReq;
    const { username } = req.user;

    try {
      const res = this.roleEntity.findOneBy({ code });
      if (res) {
        return this.r.error('角色编码已存在');
      }

      this.roleEntity
        .createQueryBuilder()
        .insert()
        .into(RoleEntity)
        .values({
          ...createRoleReq,
          createdBy: username,
        })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRoleList(params: QueryRoleDto) {
    const { pageNum, pageSize, name = '' } = params;
    try {
      const [result, total] = await this.roleEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: {
          name: ILike('%' + name + '%'),
        },
      });
      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 删除角色 */
  async deleteRole(id: IdDto) {}

  /** 编辑角色 */
  async updateRole(createMenuDto: CreateMenuDto, req: CustomRequest) {}
}
