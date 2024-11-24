import { Module } from '@nestjs/common';
import config from '@/config';

import { GlobalModule } from './global/global';
import { AuthModule } from '@/module/auth.module';

@Module({
  imports: [...config, GlobalModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
