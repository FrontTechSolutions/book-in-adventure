import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    welcome: 'Bienvenue sur Book-in Adventure'
  },
  en: {
    welcome: 'Welcome to Book-in Adventure'
  }
}

export default createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages
})
