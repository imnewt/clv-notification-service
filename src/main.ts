import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { microserviceConfig } from './configs/microserviceConfig';
import { NOTIFICATION_SERVICE_PORT } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceConfig);
  app.setGlobalPrefix('api');
  await app.startAllMicroservices();
  await app.listen(NOTIFICATION_SERVICE_PORT);
}
bootstrap();
