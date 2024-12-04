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

  // @IsPhoneNumber()
  mobile: string;
}
