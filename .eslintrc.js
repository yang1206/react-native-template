module.exports = {
  root: true,
  extends: [
    '@antfu/eslint-config-react',
  ],
  overrides: [
    {
      files: ['src/*.ts', 'src/*.tsx'],
      extends: [
        'plugin:tailwindcss/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['react-native'],
    },
    {
      files: ['*.json'],
      rules: {
        'quote-props': ['error', 'always'],
        'quotes': ['error', 'double'],
        '@typescript-eslint/quotes': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'never'],
      },
    },

  ],
  rules: {
    'no-shadow': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
  ignorePatterns: ['ios/', 'node_modules/', 'android/', '.bundle', '.vscode'],
}
