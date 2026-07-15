import { loginSchema } from './login.schema';
import { registerSchema } from './register.schema';
import { forgotPasswordSchema } from './forgot-password.schema';

export const identitySchemas: Record<string, object> = {
  LoginRequestDto: loginSchema as object,
  RegisterRequestDto: registerSchema as object,
  ForgotPasswordRequestDto: forgotPasswordSchema as object,
};
