import vuePlugin from 'eslint-plugin-vue'
import _vueParser from 'vue-eslint-parser'
import { GLOB_EXCLUDE, GLOB_VUE } from '../globs'
import { getConfigName } from '../shared'
import {
  type FlatESLintConfig,
  type FlatESLintParser,
  type FlatESLintRules,
} from '../types'
import { tsParser, tsPlugin, typescript } from './typescript'

const vueParser = _vueParser as unknown as FlatESLintParser

export { vueParser, vuePlugin }

export const reactivityTransform: FlatESLintConfig[] = [
  {
    name: getConfigName('vue', 'reactivity-transform'),
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $computed: 'readonly',
        $customRef: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      'vue/no-setup-props-destructure': 'off',
    },
  },
]

const vueCustomRules = {
  'vue/component-tags-order': [
    'off',
    { order: ['script', 'template', 'style'] },
  ],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/eqeqeq': ['error', 'smart'],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    },
  ],
  'vue/max-attributes-per-line': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/no-constant-condition': 'warn',
  'vue/no-empty-pattern': 'error',
  'vue/no-loss-of-precision': 'error',
  'vue/no-unused-refs': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/no-v-html': 'off',
  'vue/object-shorthand': [
    'error',
    'always',
    {
      ignoreConstructors: false,
      avoidQuotes: true,
    },
  ],
  'vue/padding-line-between-blocks': ['error', 'always'],
  'vue/prefer-template': 'error',
  'vue/require-prop-types': 'off',
  'vue/require-default-prop': 'off',
} as unknown as FlatESLintRules

const vue3Rules = {
  ...vuePlugin.configs.base.rules,
  ...vuePlugin.configs['vue3-essential'].rules,
  ...vuePlugin.configs['vue3-strongly-recommended'].rules,
  ...vuePlugin.configs['vue3-recommended'].rules,
} as unknown as FlatESLintRules

const vue2Rules = {
  ...vuePlugin.configs.base.rules,
  ...vuePlugin.configs.essential.rules,
  ...vuePlugin.configs['strongly-recommended'].rules,
  ...vuePlugin.configs.recommended.rules,
} as unknown as FlatESLintRules

const getVueConfig = (vueVersion: 'vue2' | 'vue3') => {
  const vueVersionRules = vueVersion === 'vue2' ? vue2Rules : vue3Rules

  const vueRules: FlatESLintConfig[] = [
    {
      name: getConfigName('vue', 'base'),
      files: [GLOB_VUE],
      plugins: {
        vue: vuePlugin,
        '@typescript-eslint': tsPlugin,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        parser: vueParser,
        parserOptions: {
          parser: tsParser,
          sourceType: 'module',
          extraFileExtensions: ['.vue'],
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      processor: vuePlugin.processors['.vue'],
      rules: {
        ...typescript[0].rules,
      },
      ignores: [...GLOB_EXCLUDE],
    },
    {
      name: getConfigName('vue', vueVersion),
      plugins: {
        vue: vuePlugin,
      },
      rules: {
        ...vueVersionRules,
        ...vueCustomRules,
      },
      ignores: [...GLOB_EXCLUDE],
    },
    ...reactivityTransform,
  ]

  return vueRules
}

export const vueLegacy = getVueConfig('vue2')
export const vue = getVueConfig('vue3')
