import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ResponsesInterceptors } from './helpers/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponsesInterceptors());
  await app.listen(3000);
}

bootstrap();
