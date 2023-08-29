import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { generateWelcomeEmail } from 'src/shared/templates/welcome-email.template';
import { generateResetPasswordEmail } from 'src/shared/templates/reset-password.template';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    } as nodemailer.TransportOptions);
  }

  async sendWelcomeEmail(email: string, password: string) {
    const mailOptions = generateWelcomeEmail(email, password);
    await this.transporter.sendMail(mailOptions);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const mailOptions = generateResetPasswordEmail(email, token);
    await this.transporter.sendMail(mailOptions);
  }
}
