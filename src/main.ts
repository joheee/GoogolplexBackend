import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('googolplex');

  const config = new DocumentBuilder()
    .setTitle('Googolplex Backend Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Paste the JWT Token here!!`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/googolplex/docs', app, documentFactory);

  app.enableCors({
    origin: '*', // Allow all origins
    methods: '*', // Allow all HTTP methods
    allowedHeaders: '*', // Allow all headers
  });

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
