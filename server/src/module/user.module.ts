import { Module } from '@nestjs/common';
import { UserController } from '@/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
