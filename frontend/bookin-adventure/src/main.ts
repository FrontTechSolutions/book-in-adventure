
import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import { registerPlugins } from './app'

const app = createApp(App)
registerPlugins(app)
