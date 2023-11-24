import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResponsesInterceptors } from './helpers/interceptors';
import { HttpExceptionFilter } from './helpers/interceptors/response.error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new ResponsesInterceptors());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
