import { Controller } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { MessagePattern } from '@nestjs/microservices';
import { CustomUser } from '@libs/shared/types/customRequest';
import {
  CreateSubjectDto,
  QuerySubjecDto,
} from '@libs/shared/dtos/subject.dto';

@Controller()
export class SubjectController {
  constructor(public readonly subjectService: SubjectService) {}

  /** @desc 新增科目 */
  @MessagePattern('subject/create')
  createMenu(params: { createSubjectDto: CreateSubjectDto; user: CustomUser }) {
    const { createSubjectDto, user } = params;
    return this.subjectService.createSubject(createSubjectDto, user);
  }

  /** @desc 获取科目列表 */
  @MessagePattern('subject/list')
  async getSubjectList(querySubjecDto: QuerySubjecDto) {
    return this.subjectService.getSubjectList(querySubjecDto);
  }
}
