import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM_SERVER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['system_user'],
          protoPath: [
            join(
              __dirname,
              '../../../../../../_proto/system-service/user.proto',
            ),
          ],
        },
      },
      // {
      //   name: 'LUCKYSTAR_SERVER_PACKAGE',
      //   transport: Transport.GRPC,
      //   options: {
      //     package: ['hero'],
      //     protoPath: [
      //       join(__dirname, '../../_proto/luckystar-service/hero.proto'),
      //     ],
      //   },
      // },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
