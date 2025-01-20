import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  // swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest api文档')
    .setDescription('这是一个描述')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
