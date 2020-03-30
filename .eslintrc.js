module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'standard',
    'plugin:vue/essential',
    '@vue/typescript',
    '@vue/standard',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
    // 'plugin:vue/essential',
    // '@vue/typescript',
    // '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/script-indent': [
      'error',
      2,
      { 'baseIndent': 1 }
    ],
    'semi': ['error', 'always']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'no-tabs': 'off'
      }
    }
  ]
};
