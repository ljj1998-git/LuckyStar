import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  pageNum?: number = 1; // 默认第一页

  @IsOptional()
  @IsInt()
  @IsPositive()
  pageSize?: number = 10; // 默认每页10条记录
}
