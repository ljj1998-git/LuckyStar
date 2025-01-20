import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface HeroesService {
  findOne({ id }): string;
}

@Injectable()
export class AppService {
  private userService: HeroesService;

  constructor(@Inject('SYSTEM_SERVER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<HeroesService>('UserService');
  }

  getHello(): string {
    return this.userService.findOne({ id: 1 });
  }
}
