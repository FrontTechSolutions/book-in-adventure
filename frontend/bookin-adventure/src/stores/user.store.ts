
import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'
import { type User } from '../interfaces/User'
import { type RegisterPayload } from '../interfaces/payload/RegisterPayload'



export const useUserStore = defineStore('user', () => {
  const user: Ref<User | undefined> = ref(undefined)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | undefined>(undefined)
  const userOtpCode = ref<string | null>(null)

  const register = async (payload: RegisterPayload) => {
    loading.value = true
    error.value = undefined
    try {
      const data = await userService.register(payload)
      user.value = data.user
      token.value = data.token
      console.log('Registered user:', user.value)
      if (token.value)
        localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.register_failed'
    } finally {
      loading.value = false
    }
  }

  const loadUser = async (): Promise<{ user: User | undefined } | undefined> => {
    if (!token.value) return undefined
    loading.value = true
    try {
      const id = getUserId()
      if (!id) throw new Error('No user id')
      const data = await userService.getUser(id, token.value)
      user.value = data.user
      return { user: user.value }
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.load_user_failed'
      return { user: undefined }
    } finally {
      loading.value = false
    }
  }

  const update = async (payload: RegisterPayload) => {
    loading.value = true
    error.value = undefined
    try {
      const id = getUserId()
      if (!id) throw new Error('No user id')
      const data = await userService.update(id, payload)
      user.value = data.user
      token.value = data.token
      console.log('Registered user:', user.value)
      if (token.value)
        localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.register_failed'
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = undefined
    try {
      const data = await userService.login(email, password)
      user.value = data.user
      token.value = data.token
      if (token.value)
        localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'error.login_failed'
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = undefined
    token.value = null
    localStorage.removeItem('token')
  }

  const loadFromStorage = () => {
    const t = localStorage.getItem('token')
    if (t) {
      token.value = t
    }
  }


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


    const verifyAccount = async (code: string) => {
      loading.value = true
      error.value = undefined
      try {
        const response = await userService.verifyAccount(user.value?.email || '', code)
        response.user && (user.value = response.user)
        return response
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.verify_account_failed'
      } finally {
        loading.value = false
      }
    }

    const passwordRequestCode = async (email: string) => {
      loading.value = true
      error.value = undefined
      try {
        await userService.passwordRequestCode(email)
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.request_password_reset_failed'
      } finally {
        loading.value = false
      }
    }    

    const passwordConfirm = async (currentPassword: string, newPassword: string) => {
      console.log('Password confirm called with OTP code:', userOtpCode.value);
      console.log('Current Password:', currentPassword);
      console.log('New Password:', newPassword);
      loading.value = true
      error.value = undefined
      try {
        const response = await userService.passwordConfirm({ currentPassword, newPassword, code: userOtpCode.value || '' })
        return response
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.confirm_password_reset_failed'
      } finally {
        loading.value = false
      }
    }

    const passwordConfirmCode = async (email: string, code: string) => {
      loading.value = true
      error.value = undefined
      try {
        const response = await userService.passwordConfirmCode(email, code)
        userOtpCode.value = response.code;
        return response;
      } catch (err: any) {
        error.value = err.response?.data?.error || err.message || 'error.confirm_password_reset_code_failed'
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
