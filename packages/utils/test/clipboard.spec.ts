import { describe, expect, it } from 'vitest'
import { clipboard } from '..'

describe('clipboard', () => {
  it('Valid data', async () => {
    expect(await clipboard.read()).toBe('')
  })
  it('Invalid data', async () => {
    expect(clipboard.isSupported).toBeFalsy()
    expect(await clipboard.write('hello')).toBeFalsy()
  })
})

// <template>
//   <div ref="hello">Hello World</div>

//   <div>
//     <input ref="input" type="text" v-model="text" />
//     <button @click="copy">Copy</button>
//     <button @click="cut">Cut</button>
//     <button @click="clipboard.write('哈哈哈')">Write</button>
//     <button @click="read">Read</button>
//   </div>

//   <div>{{ text }}</div>
// </template>

// <script setup lang="ts">
// import { ref } from 'vue'
// import { clipboard } from '@bassist/utils'

// const hello = ref<HTMLElement>()
// const input = ref<HTMLInputElement>()
// const text = ref<string>('')

// async function read() {
//   text.value = await clipboard.read()
// }

// async function copy() {
//   if (!hello.value) return
//   clipboard.copy(hello.value)
// }

// async function cut() {
//   if (!input.value) return
//   await clipboard.cut(input.value)
// }
// </script>
