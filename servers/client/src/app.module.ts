import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import config from '@/configs';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from './services/system-service/modules/user/user.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'SYSTEM_SERVER_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: ['system_user'],
    //       protoPath: [
    //         join(__dirname, '../../_proto/system-service/user.proto'),
    //       ],
    //     },
    //   },
    //   // {
    //   //   name: 'LUCKYSTAR_SERVER_PACKAGE',
    //   //   transport: Transport.GRPC,
    //   //   options: {
    //   //     package: ['hero'],
    //   //     protoPath: [
    //   //       join(__dirname, '../../_proto/luckystar-service/hero.proto'),
    //   //     ],
    //   //   },
    //   // },
    // ]),
    ...config,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
