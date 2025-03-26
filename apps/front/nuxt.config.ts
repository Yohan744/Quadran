import dotenv from 'dotenv';
import process from 'node:process';
import { defineNuxtConfig } from 'nuxt/config';
import checker from 'vite-plugin-checker';

dotenv.config({ path: '../../.env' });

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
      brotli: true
    }
  },

  vite: {
    plugins: [
      checker({
        typescript: true,
        vueTsc: true,
        enableBuild: true,
        overlay: true,
        terminal: true
      })
    ],

    json: {
      stringify: true
    },
    build: {
      cssMinify: true,
      ssrManifest: true,
      minify: 'terser'
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables" as *; @use "@/assets/scss/colors" as *; @use "@/assets/scss/breakpoints" as *;`
        }
      }
    }
  },

  fonts: {
    families: [
      { name: 'Poppins', provider: 'local', src: './assets/fonts/Poppins-Regular.ttf', weight: 400 } // TODO CHANGE LATER
    ]
  },

  piniaPluginPersistedstate: {
    storage: 'localStorage',
    debug: false
  },

  postcss: {
    plugins: {
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
    }
  }
});
