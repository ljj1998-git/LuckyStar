import { Global, Module } from '@nestjs/common';
import { AjaxResultService } from './ajaxResponse.service';

@Global()
@Module({
  providers: [AjaxResultService],
  exports: [AjaxResultService],
})
export class AjaxResultjaxResponesModule {}
