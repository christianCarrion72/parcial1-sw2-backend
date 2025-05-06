import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://softwaretecnico.netlify.app',
      'https://www.softwaretecnico.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    credentials: true,
    allwedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });
  const port = process.env.PORT || 3000;
  console.log(`La aplicación está escuchando en el puerto: ${port}`);
  await app.listen(port);
}
bootstrap();
