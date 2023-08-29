import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';
import { NOTIFICATION_SERVICE_PORT } from './shared/utilities/constants';
import { microserviceConfig } from './shared/configs/microserviceConfig';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceConfig);
  app.setGlobalPrefix('api');
  await app.startAllMicroservices();
  await app.listen(NOTIFICATION_SERVICE_PORT);
}
bootstrap();
