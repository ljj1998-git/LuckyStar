import { Global, Module } from '@nestjs/common';
import config from '@/config';

import { AuthModule } from '@/module/auth.module';
import { ConstantsProvider } from '@/constants/constants.provider';
import { UserModule } from '@/module/user.module';

@Global()
@Module({
  imports: [...config, AuthModule, UserModule],
  controllers: [],
  providers: [ConstantsProvider],
  exports: [ConstantsProvider],
})
export class AppModule {}
