import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import { GLOB_EXCLUDE, GLOB_VUE } from '../constants'
import { tsParser, tsPlugin, typescript } from './typescript'
import type { FlatESLintConfig, Rules } from 'eslint-define-config'

export { vueParser, vuePlugin }

export const reactivityTransform: FlatESLintConfig[] = [
  {
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
} as unknown as Rules

const vue3Rules: Rules = {
  ...vuePlugin.configs.base.rules,
  ...vuePlugin.configs['vue3-essential'].rules,
  ...vuePlugin.configs['vue3-strongly-recommended'].rules,
  ...vuePlugin.configs['vue3-recommended'].rules,
}

const vue2Rules: Rules = {
  ...vuePlugin.configs.base.rules,
  ...vuePlugin.configs.essential.rules,
  ...vuePlugin.configs['strongly-recommended'].rules,
  ...vuePlugin.configs.recommended.rules,
}

function getVueConfig(vueVersionRules: Rules) {
  const vueRules: FlatESLintConfig[] = [
    {
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

export const vueLegacy = getVueConfig(vue2Rules)
export const vue = getVueConfig(vue3Rules)
