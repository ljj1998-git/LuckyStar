import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SYSTEM_SERVER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          protoPath: [join(__dirname, '_proto/user.proto')],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
