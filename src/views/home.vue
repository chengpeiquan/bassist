<template>
  <img :src="logo" alt="Vue logo">

  <p>{{ msg }}</p>
<!-- 
  <a-button type="primary" @click="log('Hello World!')">
    打印 LOG
  </a-button> -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// import axios from 'axios'
import logo from '/@img/logo.png'

export default defineComponent({
  setup () {
    const msg: string = 'Hello World!';

    // const getData = (): void => {
    //   axios({
    //     method: 'get',
    //     url: '/api/data.json',
    //     params: {
    //       time: Date.now()
    //     }
    //   }).then( res => {
    //     console.log(res.data);
        
    //   }).catch( err => {
    //     console.log(err);
    //   })
    // }

    const log = (text: string): void => {
      console.log(text);
    }

    onMounted( () => {
      console.log('done.');
      // getData();
    })

    return {
      msg,
      logo,

      log
    }
  }
})
</script>

<style lang="stylus" scoped>

</style>