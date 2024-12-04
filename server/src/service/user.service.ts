import { ConstantsProvider } from '@/constants/constants.provider';
import { LoginDto, RegisterDto } from '@/dto/request/user.dto';
import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '@/service/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly constants: ConstantsProvider,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}
  /** 用户注册 */
  async register(registerDto: RegisterDto) {
    const { username, password, mobile } = registerDto;

    const r1 = await this.userEntity.findOneBy({ mobile });
    if (r1) {
      return {
        status: this.constants.RESPONSE_CODE.NOSUCCESS,
        message: '用户已存在',
      };
    }
    try {
      const r2 = await this.userEntity
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({ username, password, mobile })
        .execute();
      console.log(r2);
    } catch (e) {
      console.error('用户注册失败', e);
      throw new Error('用户注册失败');
    }
  }

  async login(loginDto: LoginDto) {
    const { mobile, password } = loginDto;
    const r1 = await this.userEntity.findOneBy({ mobile });
    console.log(r1);

    if (!r1) {
      return {
        status: this.constants.RESPONSE_CODE.NOSUCCESS,
        message: '用户不存在',
      };
    }
    if (r1.password !== password) {
      return {
        status: this.constants.RESPONSE_CODE.NOSUCCESS,
        message: '密码错误',
      };
    }
    console.log(ConfigModule, ConfigService);
    const { id, username } = r1;
    const token = this.authService.getToken({ id, username, mobile });
    // await this.authService.getPermission(id);
    return {
      status: this.constants.RESPONSE_CODE.SUCCESS,
      message: '登录成功',
      data: {
        token,
      },
    };
  }
}
