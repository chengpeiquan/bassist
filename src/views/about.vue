<template>
  <img :src="avatar" alt="Vue logo">
  <p>{{ msg }}</p>
  <div class="avatar"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import axios from 'axios'
import avatar from '/@img/avatar.jpg'

export default defineComponent({
  setup () {
    const msg: string = 'Hello World!';

    const getData = (): void => {
      axios({
        method: 'get',
        url: '/api/data.json',
        params: {
          time: Date.now()
        }
      }).then( res => {
        console.log(res.data);
        
      }).catch( err => {
        console.log(err);
      })
    }

    onMounted( () => {
      console.log('done.');
      getData();
    })

    return {
      msg,
      avatar
    }
  }
})
</script>

<style lang="stylus" scoped>
@import "../assets/styl/config";

.avatar
  width 120px
  height @width
  background-image url('../assets/img/avatar.jpg')
  @extend .ex-bg
  margin 0 auto
</style>