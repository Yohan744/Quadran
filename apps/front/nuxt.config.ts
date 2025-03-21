import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  rootDir: './',
  css: ['./assets/scss/main.scss'],
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: false
  }
})
