export interface IMailerTransporter {
  sendWelcomeEmail(email: string, password: string): Promise<void>;
  sendResetPasswordEmail(email: string, token: string): Promise<void>;
}

export const IMailerTransporter = Symbol('IMailerTransporter');
