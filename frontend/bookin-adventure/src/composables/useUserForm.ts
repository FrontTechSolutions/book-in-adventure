
import { formatISO, parse } from 'date-fns'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Address } from '@/interfaces/Address'

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
    companyAddress: (initial?.companyAddress as Address | null) ?? null,
    birthDate: initial?.birthDate || '',
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
      // Vérifie le format dd/MM/yyyy strict
      const parsed = parse(v, 'dd/MM/yyyy', new Date())
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(v) || isNaN(parsed.getTime())) return t('register.birthDate_invalid')
      const now = new Date()
      const age = now.getFullYear() - parsed.getFullYear() - (now.getMonth() < parsed.getMonth() || (now.getMonth() === parsed.getMonth() && now.getDate() < parsed.getDate()) ? 1 : 0)
      if (age < 18) return t('register.age_min')
      return true
    }
  }

  // Auto-formatage JJ/MM/AAAA
const autoFormatDate = (input: string) => {
  let digits = input.replace(/\D/g, '');
  if (digits.length > 8) digits = digits.slice(0, 8);
  let result = '';
  if (digits.length > 4) {
    result = digits.slice(0,2) + '/' + digits.slice(2,4) + '/' + digits.slice(4);
  } else if (digits.length === 4) {
    result = digits.slice(0,2) + '/' + digits.slice(2,4) + '/';
  } else if (digits.length > 2) {
    result = digits.slice(0,2) + '/' + digits.slice(2);
  } else if (digits.length === 2) {
    result = digits + '/';
  } else {
    result = digits;
  }
  if (result.length > 2 && result[2] !== '/') {
    result = result.slice(0,2) + '/' + result.slice(2);
  }
  if (result.length > 5 && result[5] !== '/') {
    result = result.slice(0,5) + '/' + result.slice(5);
  }
  return result;
}

  // Handler pour le champ date de naissance (à utiliser dans UserForm.vue)
const onBirthDateInput = (val: string, birthDateDisplay: any, form: any) =>  {
  const formatted = autoFormatDate(val);
  if (birthDateDisplay && typeof birthDateDisplay === 'object' && 'value' in birthDateDisplay) {
    birthDateDisplay.value = formatted;
  }
  // Met à jour form.value.birthDate en ISO pour le backend
  const formObj = (form && typeof form === 'object' && 'value' in form) ? form.value : form;
  if (formatted.length === 10) {
    const parsed = parse(formatted, 'dd/MM/yyyy', new Date());
    if (!isNaN(parsed.getTime())) {
      formObj.birthDate = formatISO(parsed);
    } else {
      formObj.birthDate = undefined;
    }
  } else {
    formObj.birthDate = undefined;
  }
}

  return { type, form, rules, onBirthDateInput, autoFormatDate }
}
