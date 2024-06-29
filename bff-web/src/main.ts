import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
  .setTitle('API Mobi7 Challenge')
  .setDescription('Challenge Mobi7 Localiza - Posições de veículos')
  .setVersion('1.0')
  .addTag('mobi7')
  .build();

  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
