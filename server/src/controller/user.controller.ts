import { LoginDto } from '@/dto/request/user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/register')
  register(): string {
    return 'Hello World!';
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): string {
    const { username, password } = loginDto;
    console.log(username, password);
    return 'Hello World!';
  }

  @Post('logout')
  logout(): string {
    return 'Hello World!';
  }
}
