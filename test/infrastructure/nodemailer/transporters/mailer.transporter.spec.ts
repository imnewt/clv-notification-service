import { Test, TestingModule } from '@nestjs/testing';

import { IMailerTransporter } from '@domain/transporters/mailer.transporter.interface';
import { FRONTEND_URL } from '@domain/utilities/constants';
import { MailerTransporter } from '@infrastructure/nodemailer/transporters/mailer.transporter';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe('MailerTransporter', () => {
  let mailerTransporter: IMailerTransporter;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerTransporter],
    }).compile();

    mailerTransporter = module.get<IMailerTransporter>(MailerTransporter);
  });

  it('should be defined', () => {
    expect(mailerTransporter).toBeDefined();
  });

  it('should send a welcome email', async () => {
    const email = 'test@example.com';
    const password = 'testPassword';

    const sendMailMock = (mailerTransporter as any).transporter
      .sendMail as jest.Mock;

    await mailerTransporter.sendWelcomeEmail(email, password);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'Welcome to CLV - Truc Mai',
        html: expect.stringContaining('Welcome to Our Website!'),
        to: email,
      }),
    );
  });

  it('should send a reset password email', async () => {
    const email = 'test@example.com';
    const token = 'resetToken';

    const sendMailMock = (mailerTransporter as any).transporter
      .sendMail as jest.Mock;

    await mailerTransporter.sendResetPasswordEmail(email, token);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'Changing password request',
        html: expect.stringContaining(
          `<a href='${FRONTEND_URL}/reset-password?resetToken=${token}'>link</a>`,
        ),
        to: email,
      }),
    );
  });
});
