import { Test, TestingModule } from '@nestjs/testing';

import { EmailController } from '@application/controllers/email.controller';
import { IEmailService } from '@domain/services/email.service.interface';

describe('EmailController', () => {
  let emailController: EmailController;
  let emailService: IEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: IEmailService,
          useValue: {
            sendWelcomeEmail: jest.fn(),
            sendResetPasswordEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    emailController = module.get<EmailController>(EmailController);
    emailService = module.get<IEmailService>(IEmailService);
  });

  it('should be defined', () => {
    expect(emailController).toBeDefined();
  });

  it('should call sendWelcomeEmail method when receiving SEND_WELCOME_MAIL event', async () => {
    const payload = { email: 'test@example.com', password: 'password123' };

    await emailController.sendWelcomeEmail(payload);

    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith(
      payload.email,
      payload.password,
    );
  });

  it('should call sendResetPasswordEmail method when receiving SEND_RESET_PASSWORD_MAIL event', async () => {
    const payload = { email: 'test@example.com', token: 'resetToken123' };

    await emailController.sendResetPasswordEmail(payload);

    expect(emailService.sendResetPasswordEmail).toHaveBeenCalledWith(
      payload.email,
      payload.token,
    );
  });
});
