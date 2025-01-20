import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from '@/services/system-service/modules/user/user.service';

@Controller('system-service/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() body: any) {
    return await this.userService.register();
    // const { username, password } = body;
    // const result = await this.authService.register(username, password);
    // session.userId = result.id;
    // return result;
  }
}
