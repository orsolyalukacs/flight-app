module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-restricted-syntax': 0,
    'object-shorthand': ['error', 'always', {
      avoidQuotes: false,
    }],
    "linebreak-style": 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
      json: 'never',
    }],
    'generator-star-spacing': 'off',
    'import/no-unresolved': 'off',
    'no-labels': 'off',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'off',
    'no-unused-expressions': 'off',
    'no-unused-labels': 'off',
    'vue/html-closing-bracket-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-spacing': ['error', {
      selfClosingTag: 'never'
    }],
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': [
            '.js',
            '.jsx',
            '.vue'
        ]
      }
    }
  }
}
