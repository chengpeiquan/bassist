<template>
  <img :src="logo" alt="Vue logo">
  <p>{{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '/@img/logo.png'

export default defineComponent({
  setup () {
    const msg: string = 'Hello World!';

    return {
      msg
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>