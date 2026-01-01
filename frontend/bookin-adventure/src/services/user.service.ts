

import type { RegisterPayload, LoginPayload, PasswordConfirmPayload, ConfirmationPayload, EmailConfirmPayload, EmailRequestPayload } from '@/interfaces/payload/UserPayloads'
import type {
  RegisterResponse,
  UpdateResponse,
  LoginResponse,
  GetUserResponse,
  VerifyAccountResponse,
  PasswordRequestCodeResponse,
  PasswordConfirmCodeResponse,
  PasswordConfirmResponse,
  EmailConfirmResponse
} from '@/interfaces/payload/UserResponses'
import { apiService } from './api.service';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const userService = {
  register: async (payload: RegisterPayload) => {
    return await apiService.post<RegisterResponse>('/auth/register', payload)
  },
  update: async (id: string, payload: RegisterPayload) => {
    return await apiService.put<UpdateResponse>(`/auth/update/${id}`, payload, getAuthHeaders())
  },
  login: async (payload: LoginPayload) => {
    return await apiService.post<LoginResponse>('/auth/login', payload)
  },
  getUser: async (id: string) => {
    return await apiService.get<GetUserResponse>(`/auth/user/${id}`, getAuthHeaders())
  },
  verifyAccount: async (payload:ConfirmationPayload) => {
    return await apiService.post<VerifyAccountResponse>('/auth/verify-account', payload)
  },
  resendVerificationCode: async (email: string) => {
    return await apiService.post<PasswordRequestCodeResponse>('/auth/resend-verification-code', { email })
  },
  passwordRequestCode: async (email: string) => {
    return await apiService.post<PasswordRequestCodeResponse>('/auth/password-request/code', { email }, getAuthHeaders())
  },
  passwordConfirmCode: async (payload:ConfirmationPayload) => {
    return await apiService.post<PasswordConfirmCodeResponse>('/auth/password-confirm/code', payload, getAuthHeaders())
  },
  passwordConfirm: async (payload: PasswordConfirmPayload) => {
    return await apiService.post<PasswordConfirmResponse>(`/auth/password-confirm`, payload, getAuthHeaders())
  },
  emailRequest: async (payload: EmailRequestPayload) => {
    console.log('Sending email request with payload:', payload);
    console.log('Auth headers:', getAuthHeaders());
    return await apiService.post<EmailConfirmResponse>('/auth/email-request', payload, getAuthHeaders())
  },
  emailConfirmCode: async (payload: EmailConfirmPayload) => {
    return await apiService.post<EmailConfirmResponse>('/auth/email-confirm/code', payload, getAuthHeaders())
  }




  

}
