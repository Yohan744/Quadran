import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

export default defineNuxtConfig({
  compatibilityDate: '2025-03-22',
  ssr: false,
  rootDir: './',
  css: ['./assets/scss/main.scss'],
  devtools: { enabled: true },

  nitro: {
    preset: 'vercel',
    minify: true,
    compressPublicAssets: {
      brotli: true
    }
  },

  vite: {
    json: {
      stringify: true
    },
    build: {
      cssMinify: true,
      ssrManifest: true,
      minify: "terser"
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/scss/variables.scss";` TODO CHANGE LATER
        }
      }
    }
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: false
  },
})
