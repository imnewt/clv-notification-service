import { Module } from '@nestjs/common';

import { IMailerTransporter } from '@domain/transporters/mailer.transporter.interface';
import { MailerTransporter } from './transporters/mailer.transporter';

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
