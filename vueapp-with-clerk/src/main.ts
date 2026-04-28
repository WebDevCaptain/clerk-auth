import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import './style.css'
import App from './App.vue'
import router from './router'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const app = createApp(App)

app.use(router)
app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
  afterSignOutUrl: '/',
})

app.mount('#app')
