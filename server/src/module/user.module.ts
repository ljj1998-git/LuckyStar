import { Module } from '@nestjs/common';
import { UserController } from '@/controller/user.controller';
import { UserService } from '@/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/user.entity';
import { AuthModule } from '@/module/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
