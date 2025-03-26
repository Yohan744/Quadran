module.exports = {
  singleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  vueIndentScriptAndStyle: true,
  semi: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.vue',
      options: {
        htmlWhitespaceSensitivity: 'ignore',
        cssWhitespaceSensitivity: 'ignore'
      }
    }
  ]
};
