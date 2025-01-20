import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

interface HeroById {
  id: number;
}

interface Hero {
  id: number;
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @GrpcMethod('UserService', 'FindOne')
  // findOne(data: HeroById): Hero {
  //   console.log(6666);

  //   const items = [
  //     { id: 1, name: 'John' },
  //     { id: 2, name: 'Doe' },
  //   ];
  //   return { id: 225, name: 'Doe' };
  // }
}
