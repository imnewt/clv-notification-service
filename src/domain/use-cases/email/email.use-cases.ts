import { Inject, Injectable } from '@nestjs/common';

import { IEmailService } from '@domain/use-cases/email/email.service.interface';
import { IMailerTransporter } from '@domain/transporters/mailer.transporter.interface';

@Injectable()
export class EmailService implements IEmailService {
  constructor(
    @Inject(IMailerTransporter)
    private readonly mailerTransporter: IMailerTransporter,
  ) {}

  async sendWelcomeEmail(email: string, password: string) {
    await this.mailerTransporter.sendWelcomeEmail(email, password);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    await this.mailerTransporter.sendResetPasswordEmail(email, token);
  }
}
