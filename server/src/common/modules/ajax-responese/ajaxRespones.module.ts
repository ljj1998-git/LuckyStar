import { Global, Module } from '@nestjs/common';
import { AjaxResultService } from './ajaxResponse.service';
import { ConstantsProvider } from '@/constants/constants.provider';

@Global()
@Module({
  providers: [AjaxResultService, ConstantsProvider],
  exports: [AjaxResultService],
})
export class AjaxResultjaxResponesModule {}
