// src/services/api.service.ts
import axios from '@/plugins/axios'

export const apiService = {
  get: async <T = any>(url: string, config?: object): Promise<T> => {
    const res = await axios.get<T>(url, config)
    return res.data
  },
  post: async <T = any>(url: string, data?: any, config?: object): Promise<T> => {
    const res = await axios.post<T>(url, data, config)
    return res.data
  },
  put: async <T = any>(url: string, data?: any, config?: object): Promise<T> => {
    const res = await axios.put<T>(url, data, config)
    return res.data
  },
  delete: async <T = any>(url: string, config?: object): Promise<T> => {
    const res = await axios.delete<T>(url, config)
    return res.data
  }
}
