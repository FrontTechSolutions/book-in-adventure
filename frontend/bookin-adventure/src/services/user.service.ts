

import type { User } from '@/interfaces/User'
import type { RegisterPayload } from '@/interfaces/payload/RegisterPayload'
import { apiService } from './api.service';
const token = localStorage.getItem('token');

export const userService = {
  register: async (payload: RegisterPayload) => {
    return await apiService.post<{ user: User, token: string  }>('/auth/register', payload)
  },
  update: async (id: string, payload: RegisterPayload) => {
    return await apiService.put<{ user: User; token: string }>(`/auth/update/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  login: async (email: string, password: string) => {
    return await apiService.post<{ user: User; token: string }>('/auth/login', { email, password })
  },
  getUser: async (id: string) => {
    return await apiService.get<{ user: User }>(`/auth/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  verifyAccount: async (email: string, code: string) => {
    return await apiService.post<{ user: User;}>('/auth/verify-account', { email, code })
  },
  passwordRequestCode: async (email: string) => {
    return await apiService.post<{ user: User; token: string }>('/auth/password-request/code', { email },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  passwordConfirmCode: async (email: string, code: string) => {
    return await apiService.post<{ success: boolean, message: string, code: string }>('/auth/password-confirm/code', { email, code },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },
  passwordConfirm: async (payload: { currentPassword: string; newPassword: string; code: string }) => {
    console.log('service payload passwordConfirm:', payload);
    return await apiService.post<{ success: boolean, message: string, }>(`/auth/password-confirm`, payload ,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  },




  

}
