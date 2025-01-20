import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@Controller('client/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Session() session, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, session);
  }
}
