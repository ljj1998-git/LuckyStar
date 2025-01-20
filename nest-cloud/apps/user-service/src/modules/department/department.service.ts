import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AjaxResultService } from '@libs/shared/modules/ajax-responese/ajaxResponse.service';
import { DepartmentEntity } from '@libs/shared/entities/department.entity';
import {
  CreateDepartmentDto,
  QueryDepartmentDto,
  QueryDepartmentTreeDto,
  UpdateDepartmentDto,
} from '@libs/shared/dtos/department.dto';
import { CustomUser } from '@libs/shared/types/customRequest';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { getDepartmentTreeMysql } from './dao/department.dao';
import { plainToClass } from 'class-transformer';
import { buildTreeByPath } from '@libs/shared/utils/buildTree';
import { DepartmentTreeResp } from '@libs/shared/resp/department.resp';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly r: AjaxResultService,
    @InjectRepository(DepartmentEntity)
    private departmentEntity: Repository<DepartmentEntity>,
  ) {}

  /** 新增部门 */
  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
    user: CustomUser,
  ) {
    const { username } = user;
    const department = this.departmentEntity.create({
      ...createDepartmentDto,
      createdBy: username,
    });
    try {
      await this.departmentEntity.save(department);
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 删除部门 */
  async deleteDepartment(idDto: IdDto, user: CustomUser) {
    const { username } = user;
    const { id } = idDto;
    try {
      await this.departmentEntity.update(id, {
        isDeleted: 1,
        updatedBy: username,
        updatedAt: new Date(),
      });
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 更新部门 */
  async updateDepartment(
    updateDepartmentDto: UpdateDepartmentDto,
    user: CustomUser,
  ) {
    const { username } = user;
    const { id, ...otherParams } = updateDepartmentDto;
    try {
      this.departmentEntity
        .createQueryBuilder()
        .update(DepartmentEntity)
        .set({ ...otherParams, updatedBy: username, updatedAt: new Date() })
        .where('id = :id', { id })
        .execute();

      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门列表 */
  async getDepartmentList(queryDepartmentDto: QueryDepartmentDto) {
    const { pageNum, pageSize, name, code } = queryDepartmentDto;
    try {
      const [result, total] = await this.departmentEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: { name, code },
      });
      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门树 */
  async getDepartmentTree(queryDepartmentTreeDto: QueryDepartmentTreeDto) {
    try {
      const { name = '', code = '', status = '' } = queryDepartmentTreeDto;
      let res = await this.departmentEntity.query(getDepartmentTreeMysql(), [
        `%${name}%`,
        `%${code}%`,
        `%${status}%`,
      ]);
      // 原生query需要转换
      res = plainToClass(DepartmentTreeResp, res);
      if (name || code || status) {
        return this.r.success(res);
      }
      const tree = buildTreeByPath(res);
      return this.r.success(tree);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门详情 */
  async getDepartmentInfo(idDto: IdDto) {
    const { id } = idDto;
    try {
      const result = await this.departmentEntity.findOneBy({ id });
      if (!result) {
        return this.r.error('部门不存在');
      }
      return this.r.success(result);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
