import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['src/assets/**/*', '*.yml'],
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
