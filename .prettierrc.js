module.exports = {
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  vueIndentScriptAndStyle: true,
  semi: false,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.vue',
      options: {
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
  ],
}
