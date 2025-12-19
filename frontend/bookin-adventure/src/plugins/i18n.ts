import { createI18n } from 'vue-i18n'
import fr from '@/locals/fr'

const messages = {
  fr,
  en: {
    welcome: 'Welcome to Book-in Adventure'
  }
}

export default createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})
