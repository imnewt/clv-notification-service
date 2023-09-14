import { Module } from '@nestjs/common';

import { MailerTransporter } from './transporters/mailer.transporter';
import { IMailerTransporter } from '@domain/transporters/mailer.transporter.interface';

@Module({
  providers: [
    {
      provide: IMailerTransporter,
      useClass: MailerTransporter,
    },
  ],
  exports: [
    {
      provide: IMailerTransporter,
      useClass: MailerTransporter,
    },
  ],
})
export class MailerModule {}
