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
  watch: ['**/*.vue', '**/*.ts', '**/*.js'],

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/fonts'],

  nitro: {
    preset: 'vercel',
    minify: true,
    compressPublicAssets: {
      brotli: true
    }
  },

  vite: {
    server: {
      hmr: {
        overlay: true
      },
      fs: {
        strict: false
      },
      watch: {
        usePolling: false,
        ignored: ['**/node_modules/**', '**/.*/**', '**/dist/**', '**/.nuxt/**']
      }
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },

    plugins: [
      checker({
        vueTsc: {
          tsconfigPath: 'tsconfig.json',
          root: '.'
        },
        enableBuild: true,
        overlay: {
          position: 'bl',
          badgeStyle: 'z-index: 9999; background-color: #e74c3c; color: white; font-weight: bold;',
          panelStyle: 'z-index: 9999; max-height: 50vh; overflow-y: auto; border: 2px solid #e74c3c;'
        },
        terminal: true,
        stylelint: {
          lintCommand: 'stylelint **/*.{css,scss,vue}'
        }
      })
    ],

    json: {
      stringify: true
    },

    build: {
      cssMinify: true,
      ssrManifest: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'pinia-vendor': ['pinia']
          }
        }
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables" as *; @use "@/assets/scss/colors" as *; @use "@/assets/scss/breakpoints" as *;`
        }
      }
    },

    vue: {
      template: {
        compilerOptions: {
          hoistStatic: true,
          whitespace: 'condense',
          cacheHandlers: true
        }
      },
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
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
