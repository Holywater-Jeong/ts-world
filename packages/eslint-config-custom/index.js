module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'off',
  },
};
