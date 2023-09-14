export const generateWelcomeEmail = (email: string, password: string) => {
  return {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject: 'Welcome to CLV - Truc Mai',
    html: `
      <h1>Welcome to Our Website!</h1>
      <p>Thank you for joining us. We're excited to have you on board.</p>
      <p>Your temporary password is: <strong>${password}</strong>. For security reasons, we recommend changing your password soon. You can do this by visiting your account settings.</p>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>Truc Mai</p>
    `,
  };
};
