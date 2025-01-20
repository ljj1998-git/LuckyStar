import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
