import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as nodemailer from 'nodemailer';

config();

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
    });
  }

  async sendWelcomeEmail(email: string, password: string) {
    const mailOptions = {
      from: 'trucmaiclv@gmail.com',
      to: email,
      subject: 'Welcome to CLV - Truc Mai',
      html: `
      <h1>Welcome to Our Website!</h1>
      <p>Thank you for joining us. We're excited to have you on board.</p>
      <p>Your temporary password is: <strong>${password}</strong>. For security reasons, we recommend changing your password soon. You can do this by visiting your account settings.</p>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>Your Team</p>
    `,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
