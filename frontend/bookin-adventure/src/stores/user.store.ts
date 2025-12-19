import { ref, type Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { type User } from '../interfaces/User'
import { type RegisterPayload } from '../interfaces/payload/RegisterPayload'



export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const register = async (payload: RegisterPayload) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.post<{ user: User; token: string }>('/auth/register', payload)
      user.value = res.data.user
      token.value = res.data.token
      if (token.value)
      localStorage.setItem('token', token.value)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'error.register_failed'
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
    if (t) token.value = t
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

  return {
    user,
    token,
    loading,
    error,
    register,
    logout,
    loadFromStorage,
    userRole
  }
})
