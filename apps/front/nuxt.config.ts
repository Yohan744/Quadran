import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

export default defineNuxtConfig({
  compatibilityDate: '2025-03-22',
  ssr: false,
  rootDir: './',
  css: ['./assets/scss/main.scss'],
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/fonts'],

  nitro: {
    preset: 'vercel',
    minify: true,
    compressPublicAssets: {
      brotli: true,
    },
  },

  vite: {
    json: {
      stringify: true,
    },
    build: {
      cssMinify: true,
      ssrManifest: true,
      minify: 'terser',
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/scss/variables.scss";` TODO CHANGE LATER
        },
      },
    },
  },

  fonts: {
    families: [
      { name: 'Poppins', provider: 'local', src: './assets/fonts/Poppins-Regular.ttf', weight: 400 }, // TODO CHANGE LATER
    ],
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: false,
  },
})
