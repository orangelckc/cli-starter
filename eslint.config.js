const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  extends: ['@unocss'],
  ignores: ['*.scss', 'src/assets/**/*', 'bun.lockb', '*.yml'],
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error', 'group', 'groupEnd'] }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
},
)
