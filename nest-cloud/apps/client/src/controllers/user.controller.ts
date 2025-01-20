import { IdsDto, IdDto } from '@libs/shared/dtos/common.dto';
import {
  BindRoleDto,
  LoginDto,
  QueryUserListReq,
  RegisterDto,
  UpdateUserDto,
} from '@libs/shared/dtos/user.dto';
import { CustomRequest } from '@libs/shared/types/customRequest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';

@Controller('user')
@ApiTags('用户管理')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  @UseGuards(JwtAuthGuard)
  register(@Body() registerDto: RegisterDto, @Req() req: CustomRequest) {
    return this.userService.send('user/register', { registerDto, req });
  }

  @Get('getCaptcha')
  @ApiOperation({ summary: '获取验证码' })
  @MessagePattern('user/getCaptcha')
  getCaptcha() {
    return this.userService.send('user/getCaptcha', {});
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.send('user/login', loginDto);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @Post('list')
  @UseGuards(JwtAuthGuard)
  @MessagePattern('user/list')
  getUserList(@Body() params: QueryUserListReq) {
    return this.userService.send('user/list', params);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Query() req: IdDto) {
    return this.userService.send('user/info', req);
  }

  @ApiOperation({ summary: '更新用户' })
  @Put('update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: CustomRequest) {
    return this.userService.send('user/update', {
      updateUserDto,
      user: req.user,
    });
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Body() idsDto: IdsDto, @Req() req: CustomRequest) {
    return this.userService.send('user/delete', { idsDto, user: req.user });
  }

  @ApiOperation({ summary: '绑定角色' })
  @Post('bindRole')
  @UseGuards(JwtAuthGuard)
  @MessagePattern('user/bindRole')
  bindRole(@Body() bindRoleDto: BindRoleDto) {
    return this.userService.send('user/bindRole', bindRoleDto);
  }

  @ApiOperation({ summary: '获取用户已绑定角色' })
  @Get('getBindRole')
  @UseGuards(JwtAuthGuard)
  getBindRole(@Query() idDto: IdDto) {
    return this.userService.send('user/getBindRole', idDto);
  }
}
