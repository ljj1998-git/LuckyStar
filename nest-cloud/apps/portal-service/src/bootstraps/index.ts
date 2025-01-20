import { ConfigModule } from '@nestjs/config';

// 使用函数来导出，因为 ConfigModule 中有一个load方法，需要导入一个函数
export default [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.development',
  }),
];
