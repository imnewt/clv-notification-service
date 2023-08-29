import { FRONTEND_URL } from '../utilities/constants';

export const generateResetPasswordEmail = (email: string, token: string) => {
  return {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject: 'Changing password request',
    html: `
      <p>Please click on this <a href='${FRONTEND_URL}/reset-password?resetToken=${token}'>link</a> to reset your password. For security reasons, this link will be expired within 1 hour.</p>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>Truc Mai</p>`,
  };
};
