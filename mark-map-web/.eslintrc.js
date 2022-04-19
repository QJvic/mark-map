module.exports = {
  root: false,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  plugins: ['jsx-a11y'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
