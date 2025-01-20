import { PaginationDto } from './common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @ApiProperty({ description: '编码' })
  @IsNotEmpty({ message: '编码不能为空' })
  code: string;
}

export class QuerySubjecDto extends PaginationDto {
  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '编码' })
  code: string;
}
