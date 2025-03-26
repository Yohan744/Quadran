export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue/scss'],
  rules: {
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'block-no-empty': null,
    'color-function-notation': null,
    'scss/no-global-function-names': null,
    'alpha-value-notation': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'at-rule-no-vendor-prefix': null,
    'value-keyword-case': null
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ]
};
