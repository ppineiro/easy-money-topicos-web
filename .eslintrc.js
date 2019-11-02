module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prefer-arrow-callback': ['warn', { allowUnboundThis: false }],
    'no-console': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
