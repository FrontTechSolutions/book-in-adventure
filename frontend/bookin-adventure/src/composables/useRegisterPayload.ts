import type { RegisterPayload } from '@/interfaces/payload/UserPayloads'

export function useRegisterPayload() {
  function buildRegisterPayload(formData: any, type: string): RegisterPayload {
    if (type === 'pro') {
      return {
        email: formData.email,
        password: formData.password,
        lastName: formData.lastName,
        firstName: formData.firstName,
        phone: formData.phone,
        role: 'pro',
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        birthDate: formData.birthDate
      }
    } else {
      return {
        email: formData.email,
        password: formData.password,
        lastName: formData.lastName,
        firstName: formData.firstName,
        role: 'client',
        phone: formData.phone,
        birthDate: formData.birthDate
      }
    }
  }

  return { buildRegisterPayload }
}
