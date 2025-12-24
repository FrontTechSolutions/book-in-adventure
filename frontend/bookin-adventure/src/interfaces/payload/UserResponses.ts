import type { User } from '../User';

// Réponses API pour userService

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface UpdateResponse {
  user: User;
  token: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface GetUserResponse {
  user: User;
}

export interface VerifyAccountResponse {
  user: User;
}

export interface PasswordRequestCodeResponse {
  user: User;
}

export interface PasswordConfirmCodeResponse {
  success: boolean;
  message: string;
  code: string;
}

export interface PasswordConfirmResponse {
  success: boolean;
  message: string;
}
