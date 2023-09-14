import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from '@src/app.module';
import { NOTIFICATION_SERVICE_PORT } from '@domain/utilities/constants';
import { microserviceConfig } from '@domain/configs/microservice.config';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceConfig);
  app.setGlobalPrefix('api');
  await app.startAllMicroservices();
  await app.listen(NOTIFICATION_SERVICE_PORT);
}
bootstrap();
