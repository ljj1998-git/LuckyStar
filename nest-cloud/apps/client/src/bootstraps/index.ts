import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

export default [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.development',
  }),
  ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),
];
