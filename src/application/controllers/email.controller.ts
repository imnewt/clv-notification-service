import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';

import { IEmailService } from '@domain/use-cases/email';
import { microserviceConfig } from '@domain/configs/microservice.config';
import {
  SEND_WELCOME_MAIL,
  SEND_RESET_PASSWORD_MAIL,
} from '@domain/utilities/constants';

@Controller('email')
export class EmailController implements OnModuleInit {
  constructor(
    @Inject(IEmailService) private readonly emailService: IEmailService,
  ) {}

  @Client(microserviceConfig)
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = [SEND_WELCOME_MAIL, SEND_RESET_PASSWORD_MAIL];
    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @EventPattern(SEND_WELCOME_MAIL)
  async sendWelcomeEmail(payload: any) {
    const { email, password } = payload;
    return this.emailService.sendWelcomeEmail(email, password);
  }

  @EventPattern(SEND_RESET_PASSWORD_MAIL)
  async sendResetPasswordEmail(payload: any) {
    const { email, token } = payload;
    return this.emailService.sendResetPasswordEmail(email, token);
  }
}
