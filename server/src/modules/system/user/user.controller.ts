import { JwtAuthGuard } from '@/guards/JwtAuth.guard';
import { RolesGuard } from '@/guards/roles/roles.guard';
import {
  LoginDto,
  QueryUserListReq,
  RegisterDto,
} from '@/modules/system/user/dto/user.req';
import { UserService } from '@/modules/system/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户管理')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  // @UseGuards(JwtAuthGuard)
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Session() session, @Body() loginDto: LoginDto) {
    return this.userService.login(loginDto, session);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req): string {
    // console.log(req);
    return 'Hello World!';
  }

  /**
   * 获取验证码
   */
  @Get('getCaptcha')
  getCaptcha(@Session() session) {
    return this.userService.getCaptcha(session);
  }

  /**
   * 获取用户列表
   */
  @Post('list')
  @UseGuards(JwtAuthGuard)
  getUserList(@Body() params: QueryUserListReq) {
    return this.userService.getUserList(params);
  }
}
