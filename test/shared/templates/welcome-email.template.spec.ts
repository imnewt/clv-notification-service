import { generateWelcomeEmail } from '@shared/templates/welcome-email.template';

describe('generateWelcomeEmail', () => {
  it('should generate a welcome email with the correct content', () => {
    const email = 'test@example.com';
    const password = 'temporaryPassword123';

    const emailContent = generateWelcomeEmail(email, password);

    const expectedEmailContent = {
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: 'Welcome to CLV - Truc Mai',
      html: expect.stringContaining(password),
    };

    expect(emailContent).toEqual(expectedEmailContent);
  });
});
