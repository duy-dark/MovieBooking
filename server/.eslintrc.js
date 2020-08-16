module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: ['prettier', 'airbnb-base'],
  plugin: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
    ignoreDestructuring: true,
    properties: 'never',
    'linebreak-style': ['error', 'windows']
  }
};
