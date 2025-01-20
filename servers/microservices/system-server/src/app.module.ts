import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/system/user/user.module';
import config from '@/configs';

@Module({
  imports: [...config, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
