import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filter/global.exception';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // app.useGlobalInterceptors(new LoggingInterceptor)
  // app.useGlobalFilters(new GlobalExceptionFilter);   
  await app.listen(3000);
}

start();
