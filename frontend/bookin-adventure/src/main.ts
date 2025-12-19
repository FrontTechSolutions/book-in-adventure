
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerPlugins } from './app'

const app = createApp(App)
registerPlugins(app)
