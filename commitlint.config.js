import { RuleConfigSeverity } from '@commitlint/types'

const baseTypes = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
]

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        ...baseTypes,
        'release', // Release new version
        'wip', // Work in Progress
        'deprecated', // Deprecated API
      ],
    ],
  },
}
