import { configs } from 'eslint-plugin-regexp'
import { getConfigName } from '../shared/utils'
import { type FlatESLintConfig } from '../types'

const recommendedConfigs = configs['flat/recommended']

export const regexp: FlatESLintConfig[] = [
  {
    name: getConfigName('regexp'),
    ...recommendedConfigs,
  },
]
