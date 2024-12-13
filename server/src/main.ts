import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { HttpExceptionFilter } from '@/filters/httpException.filter';
import { HttpResponse } from '@/util/response.util';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    }),
  );
  // swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest api文档')
    .setDescription('这是一个描述')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  // logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局response处理
  app.useGlobalInterceptors(new HttpResponse());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
