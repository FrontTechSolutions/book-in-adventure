
import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { type User } from '../interfaces/User'
import { type RegisterPayload } from '../interfaces/payload/RegisterPayload'



export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | undefined>(undefined)

  const register = async (payload: RegisterPayload) => {
    loading.value = true
    error.value = undefined
    try {
      const res = await axios.post<{ user: User; token: string }>('/auth/register', payload)
      user.value = res.data.user
      token.value = res.data.token
      console.log('Registered user:', user.value)
      if (token.value)
      localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'error.register_failed'
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = undefined
    try {
      const res = await axios.post<{ user: User; token: string }>('/auth/login', { email, password })
      user.value = res.data.user
      token.value = res.data.token
      if (token.value)
      localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'error.login_failed'
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
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

    const loadUser = async (): Promise<{ user: User | null } | undefined> => {
      if (!token.value) return undefined
      loading.value = true
      try {
        const res = await axios.get<{ user: User }>(`auth/user/${getUserId()}`, {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        })
        user.value = res.data.user
        return { user: user.value }
      } catch (err: any) {
        error.value = err.response?.data?.error || 'error.load_user_failed'
        return { user: null }
      } finally {
        loading.value = false
      }
    }

  return {
    user,
    token,
    loading,
    error,
    register,
    logout,
    loadFromStorage,
    userRole,
    login,
    getRole,
    getUserId,
    isLoggedIn,
    loadUser
  }
})
