import { Module } from '@nestjs/common';

import { MailerModule } from '@infrastructure/nodemailer/mailer.module';

@Module({
  imports: [MailerModule],
  exports: [MailerModule],
})
export class DomainModule {}
