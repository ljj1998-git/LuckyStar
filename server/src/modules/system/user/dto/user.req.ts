import { PaginationDto } from '@/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString({ message: '用户名不能为空' })
  username: string;

  @IsString()
  password: string;

  // @IsPhoneNumber()
  mobile: string;
}

export class LoginDto {
  @IsString({ message: '用户名不能为空' })
  username: string;

  @IsString()
  password: string;

  @IsString()
  captcha: string;

  // @IsPhoneNumber()
  mobile: string;
}

export class QueryUserListReq extends PaginationDto {
  @ApiProperty({ description: '用户名' })
  username?: string;

  @ApiProperty({ description: '状态 1:启用 0:禁用' })
  status?: number;
}
