import { Module } from '@nestjs/common';
import { SubjectModule } from './modules/subject/subject.module';
import { SharedModule } from '@libs/shared';
import bootstraps from '@client/bootstraps';

@Module({
  imports: [...bootstraps, SharedModule, SubjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
