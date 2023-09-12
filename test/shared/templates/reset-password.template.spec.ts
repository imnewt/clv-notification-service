import { generateResetPasswordEmail } from '@shared/templates/reset-password.template';
import { FRONTEND_URL } from '@shared/utilities/constants';

describe('generateResetPasswordEmail', () => {
  it('should generate a reset password email with the correct content', () => {
    const email = 'test@example.com';
    const token = 'resetToken123';

    const emailContent = generateResetPasswordEmail(email, token);

    const expectedEmailContent = {
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: 'Changing password request',
      html: expect.stringContaining(FRONTEND_URL),
    };

    expect(emailContent).toEqual(expectedEmailContent);
  });
});
