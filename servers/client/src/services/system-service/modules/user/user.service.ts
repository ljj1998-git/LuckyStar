import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface SystemUserService {
  Register({ id }): string;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userService: SystemUserService;

  constructor(@Inject('SYSTEM_SERVER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<SystemUserService>('SystemUserService');
  }

  async register() {
    // console.log(this.heroesService.findOne);

    return this.userService.Register({ id: 1 });
  }
}
