import { Test, TestingModule } from '@nestjs/testing';

import { IMailerTransporter } from '@domain/transporters/mailer.transporter.interface';
import { EmailService } from '@domain/implementations/email.service.implementation';

describe('EmailService', () => {
  let emailService: EmailService;
  let mailerTransporter: IMailerTransporter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: IMailerTransporter,
          useValue: {
            sendWelcomeEmail: jest.fn(),
            sendResetPasswordEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    mailerTransporter = module.get<IMailerTransporter>(IMailerTransporter);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  it('should call sendWelcomeEmail method with the correct parameters', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    await emailService.sendWelcomeEmail(email, password);

    expect(mailerTransporter.sendWelcomeEmail).toHaveBeenCalledWith(
      email,
      password,
    );
  });

  it('should call sendResetPasswordEmail method with the correct parameters', async () => {
    const email = 'test@example.com';
    const token = 'resetToken123';

    await emailService.sendResetPasswordEmail(email, token);

    expect(mailerTransporter.sendResetPasswordEmail).toHaveBeenCalledWith(
      email,
      token,
    );
  });
});
