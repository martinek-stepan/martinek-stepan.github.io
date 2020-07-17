module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/strongly-recommended'],
  plugins: ['vue'],
  rules: {
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    "$": true,
    "jQuery": true
  }
};
