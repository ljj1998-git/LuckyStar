import { AjaxResultService } from '@libs/shared/modules/ajax-responese/ajaxResponse.service';
import { CustomUser } from '@libs/shared/types/customRequest';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from '@libs/shared/entities/subject.entity';
import {
  CreateSubjectDto,
  QuerySubjecDto,
} from '@libs/shared/dtos/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    private readonly r: AjaxResultService,
    @InjectRepository(SubjectEntity)
    private subjectEntity: Repository<SubjectEntity>,
  ) {}

  /** @desc 创建学科 */
  async createSubject(createSubjectDto: CreateSubjectDto, user: CustomUser) {
    try {
      const { username } = user;
      const department = this.subjectEntity.create({
        ...createSubjectDto,
        createdBy: username,
      });
      await this.subjectEntity.save(department);
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** @desc 获取学科列表 */
  async getSubjectList(querySubjecDto: QuerySubjecDto) {
    try {
      const { pageSize, pageNum } = querySubjecDto;
      const [list, total] = await this.subjectEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
      });
      return this.r.success({ list, total });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
