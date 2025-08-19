module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['PropertyDefinition'], // ignores class properties with decorators
    }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'max-len': ['error', { code: 120 }],
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
  },
};
