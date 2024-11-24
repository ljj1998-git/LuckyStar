import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'GLOBAL_CONFIG',
      useValue: '123',
    },
  ],
  exports: ['GLOBAL_CONFIG'],
})
export class GlobalModule {}
