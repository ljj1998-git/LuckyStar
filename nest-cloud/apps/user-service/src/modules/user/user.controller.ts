import {
  BindRoleDto,
  LoginDto,
  QueryUserListReq,
  RegisterDto,
  UpdateUserDto,
} from '@libs/shared/dtos/user.dto';
import { UserService } from './user.service';
import { CustomRequest, CustomUser } from '@libs/shared/types/customRequest';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IdDto, IdsDto } from '@libs/shared/dtos/common.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** @desc 用户注册 */
  @MessagePattern('user/register')
  register(params: { registerDto: RegisterDto; req: CustomUser }) {
    const { registerDto, req } = params;
    return this.userService.register(registerDto, req);
  }

  /** @desc 获取验证码 */
  @MessagePattern('user/getCaptcha')
  getCaptcha() {
    return this.userService.getCaptcha();
  }

  /** @desc 登录 */
  @MessagePattern('user/login')
  login(loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  /** @desc 获取用户列表 */
  @MessagePattern('user/list')
  getUserList(params: QueryUserListReq) {
    return this.userService.getUserList(params);
  }

  /** @desc 获取用户信息 */
  @MessagePattern('user/info')
  getUserInfo(idDto: IdDto) {
    const { id } = idDto;
    return this.userService.getUserInfo(id);
  }

  /** @desc 更新用户 */
  @MessagePattern('user/update')
  updateUser(params: { updateUserDto: UpdateUserDto; user: CustomUser }) {
    const { updateUserDto, user } = params;
    return this.userService.updateUser(updateUserDto, user);
  }

  /** @desc 删除用户 */
  @MessagePattern('user/delete')
  deleteUser(params: { idsDto: IdsDto; user: CustomUser }) {
    const { idsDto, user } = params;
    return this.userService.deleteUser(idsDto, user);
  }

  /** @desc 绑定角色 */
  @MessagePattern('user/bindRole')
  bindRole(bindRoleDto: BindRoleDto) {
    return this.userService.bindRole(bindRoleDto);
  }

  /** @desc 获取用户已绑定角色 */
  @MessagePattern('user/getBindRole')
  getBindRole(idDto: IdDto) {
    const { id } = idDto;
    return this.userService.getBindRole(id);
  }
}
