export interface IEmailService {
  sendWelcomeEmail(email: string, password: string): Promise<void>;
  sendResetPasswordEmail(email: string, token: string): Promise<void>;
}
export const IEmailService = Symbol('IEmailService');
