
import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'
import { type User } from '../interfaces/User'
import type { ConfirmationPayload, LoginPayload, PasswordConfirmPayload, RegisterPayload } from '@/interfaces/payload/UserPayloads'
import type { GetUserResponse, LoginResponse, PasswordConfirmCodeResponse, PasswordConfirmResponse, PasswordRequestCodeResponse, RegisterResponse, UpdateResponse, VerifyAccountResponse } from '@/interfaces/payload/UserResponses'

export const useUserStore = defineStore('user', () => {
  const user: Ref<User | undefined> = ref(undefined)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | undefined>(undefined)
  const userOtpCode = ref<string | null>(null)


  //getters  
  const userRole = computed(() => {
    if (!token.value) return null
    try {
      const parts = token.value.split('.')
      if (parts.length < 2 || !parts[1]) return null
      const payload = JSON.parse(atob(parts[1]))
      return payload.role || null
    } catch {
      return null
    }
  })

  const loadFromStorage = () => {
    const t = localStorage.getItem('token')
    if (t) {
      token.value = t
    }
  }

  // Getter pour obtenir le rôle (string ou null)
  const getRole = (): string | null =>   {
    if (!token.value) return null
    try {
      const parts = token.value.split('.')
      if (parts.length < 2 || !parts[1]) return null
      const payload = JSON.parse(atob(parts[1]))
      return payload.role || null
    } catch {
      return null
    }
  }

    // Getter pour savoir si l'utilisateur est connecté
    const isLoggedIn = computed(() => !!token.value)
    // Getter pour obtenir l'id utilisateur (string ou null)
    const getUserId = (): string | null => {
      if (!token.value) return null
      try {
        const parts = token.value.split('.')
        if (parts.length < 2 || !parts[1]) return null
        const payload = JSON.parse(atob(parts[1]))
        return payload.id || payload._id || null
      } catch {
        return null
      }
    }  


  //actions
  const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    loading.value = true
    error.value = undefined
    try {
      const data: RegisterResponse = await userService.register(payload)
      user.value = data.user
      token.value = data.token
      if (token.value)
        localStorage.setItem('token', token.value)
      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.register_failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadUser = async (): Promise<{ user: GetUserResponse } | undefined> => {
    loading.value = true
    try {
      const id = getUserId()
      if (!id) throw new Error('No user id')
      const data = await userService.getUser(id)
      user.value = data.user
      return { user: data }
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.load_user_failed'
      return undefined
    } finally {
      loading.value = false
    }
  }

  const update = async (payload: RegisterPayload): Promise<UpdateResponse> => {
    loading.value = true
    error.value = undefined
    try {
      const id = getUserId()
      if (!id) throw new Error('No user id')
      const data: UpdateResponse = await userService.update(id, payload)
      user.value = data.user
      token.value = data.token
      if (token.value)
        localStorage.setItem('token', token.value)
      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.register_failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    loading.value = true
    error.value = undefined
    console.log('Attempting login with payload:', payload)
    try {
      const data: LoginResponse = await userService.login(payload)
      user.value = data.user
      token.value = data.token
      if (token.value)
        localStorage.setItem('token', token.value)
      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.login_failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = undefined
    token.value = null
    localStorage.removeItem('token')
  }

    const verifyAccount = async (code: string): Promise<VerifyAccountResponse | undefined> => {
      loading.value = true
      error.value = undefined
      try {
        const payload = { email: user.value?.email || '', code }  
        const response:VerifyAccountResponse = await userService.verifyAccount(payload)
        response.user && (user.value = response.user)
        return response
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.verify_account_failed'
        return undefined
      } finally {
        loading.value = false
      }
    }

    const passwordRequestCode = async (email: string): Promise<PasswordRequestCodeResponse> => {
      loading.value = true
      error.value = undefined
      try {
        const response: PasswordRequestCodeResponse = await userService.passwordRequestCode(email)
        return response
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.request_password_reset_failed'
        throw err
      } finally {
        loading.value = false
      }
    }    

    const passwordConfirm = async (currentPassword: string, newPassword: string): Promise<PasswordConfirmResponse> => {
      loading.value = true
      error.value = undefined
      try {
        const payload:PasswordConfirmPayload = { currentPassword, newPassword, code: userOtpCode.value || '' }
        const response = await userService.passwordConfirm(payload)
        return response
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.confirm_password_reset_failed'
        throw err
      } finally {
        loading.value = false
      }
    }

    const passwordConfirmCode = async (email: string, code: string): Promise<PasswordConfirmCodeResponse | undefined> => {
      loading.value = true
      error.value = undefined
      try {
        const payload: ConfirmationPayload = { email, code }
        const response = await userService.passwordConfirmCode(payload)
        userOtpCode.value = response.code;
        return response;
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.confirm_password_reset_code_failed'
        return undefined;
      } finally {
        loading.value = false
      }
    }





  return {
    user,
    token,
    loading,
    error,
    userOtpCode,
    register,
    update,
    logout,
    loadFromStorage,
    verifyAccount,
    userRole,
    login,
    getRole,
    getUserId,
    isLoggedIn,
    loadUser,
    passwordRequestCode,
    passwordConfirmCode,
    passwordConfirm,
  }
})
