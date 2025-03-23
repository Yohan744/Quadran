import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    plugins: {
      prettier,
      vue,
    },
    rules: {
      'prettier/prettier': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettierConfig,
]
