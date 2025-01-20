import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';

import { AjaxResultjaxResponesModule } from './modules/ajax-responese/ajaxRespones.module';
import { RedisCacheModule } from './modules/redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import bootstraps from './bootstraps';

@Module({
  imports: [...bootstraps, AjaxResultjaxResponesModule, RedisCacheModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
