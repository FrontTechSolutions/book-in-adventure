/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins


import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

// Types
import type { App } from 'vue'
import router from './plugins/router'
import { createPinia } from 'pinia'
const pinia = createPinia()

export function registerPlugins(app: App) {
    app.use(vuetify)
    app.use(i18n)
    app.use(router)
    app.use(pinia)
    app.mount('#app')
}
