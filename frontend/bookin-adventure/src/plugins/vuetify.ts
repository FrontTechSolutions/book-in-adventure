import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const bookInAdventureTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',    // Gris très clair pour le fond de page
    surface: '#FFFFFF',       // Blanc pour les cartes (Popular Activities, etc.)
    primary: '#1D1D1B',       // Gris anthracite (utilisé dans le header et titres)
    secondary: '#D4AF37',     // Doré (pour rappeler le badge "Vente Privée")
    accent: '#8C8C8C',        // Gris moyen pour les icônes et textes secondaires
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    // Couleurs de texte spécifiques
    'on-background': '#1D1D1B',
    'on-surface': '#1D1D1B',
    'on-primary': '#FFFFFF',
  },
  variables: {
    'border-color': '#E0E0E0',
    'border-opacity': 0.12,
  }
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'bookInAdventureTheme',
    themes: {
      bookInAdventureTheme,
    },
  },
  defaults: {
    VBtn: {
      fontFamily: 'Bebas Neue, sans-serif',
    },
  },
})