import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useUserForm(initial?: any) {
  const { t } = useI18n()
  const type = ref<'client' | 'pro' | 'invite'>(initial?.type || 'client')
  const form = ref<any>({
    email: initial?.email || '',
    password: '',
    lastName: initial?.lastName || '',
    firstName: initial?.firstName || '',
    phone: initial?.phone || '',
    companyName: initial?.companyName || '',
    companyAddress: initial?.companyAddress || '',
    birthDate: initial?.birthDate || '',
    logo: initial?.logo || '',
  })

  const rules = {
    required: (v: any) => !!v || t('register.required'),
    email: (v: string) => /.+@.+\..+/.test(v) || t('register.email_invalid'),
    password: (v: string) => v.length >= 6 || t('register.password_min'),
    name: (v: string) => {
      if (!v || v.length < 2) return t('register.name_min')
      if (/\d/.test(v)) return t('register.name_no_digits')
      return true
    },
    birthDate: (v: string) => {
      if (!v) return t('register.required')
      const birth = new Date(v)
      const now = new Date()
      const age = now.getFullYear() - birth.getFullYear() - (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) ? 1 : 0)
      if (age < 18) return t('register.age_min')
      return true
    }
  }

  return { type, form, rules }
}
