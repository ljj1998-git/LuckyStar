import { Controller } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateDepartmentDto,
  QueryDepartmentDto,
  QueryDepartmentTreeDto,
  UpdateDepartmentDto,
} from '@libs/shared/dtos/department.dto';
import { IdDto } from '@libs/shared/dtos/common.dto';
import { CustomUser } from '@libs/shared/types/customRequest';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /** @desc 创建部门 */
  @MessagePattern('department/create')
  createDepartment(params: {
    createDepartmentDto: CreateDepartmentDto;
    user: CustomUser;
  }) {
    const { createDepartmentDto, user } = params;
    return this.departmentService.createDepartment(createDepartmentDto, user);
  }

  /** @desc 删除部门 */
  @MessagePattern('department/delete')
  deleteDepartment(params: { idDto: IdDto; user: CustomUser }) {
    const { idDto, user } = params;
    return this.departmentService.deleteDepartment(idDto, user);
  }

  /** @desc 修改部门 */
  @MessagePattern('department/update')
  updateDepartment(params: {
    updateDepartmentDto: UpdateDepartmentDto;
    user: CustomUser;
  }) {
    const { updateDepartmentDto, user } = params;
    return this.departmentService.updateDepartment(updateDepartmentDto, user);
  }

  /** @desc 查询部门列表 */
  @MessagePattern('department/query')
  getDepartmentList(queryDepartmentDto: QueryDepartmentDto) {
    return this.departmentService.getDepartmentList(queryDepartmentDto);
  }

  /** @desc 查询部门树 */
  @MessagePattern('department/queryTree')
  getDepartmentTree(params: QueryDepartmentTreeDto) {
    return this.departmentService.getDepartmentTree(params);
  }

  /** @desc 查询部门详情 */
  @MessagePattern('department/info')
  getDepartmentInfo(idDto: IdDto) {
    return this.departmentService.getDepartmentInfo(idDto);
  }
}
