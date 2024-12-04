import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { HttpExceptionFilter } from '@/filters/catch';
import { HttpResponse } from '@/dto/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局response处理
  app.useGlobalInterceptors(new HttpResponse());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
