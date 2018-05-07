<template>
<div>
  <img :src= banner >
  </div>
</template>

<script>
import bannerimg from '@/assets/banner.png'
export default {
  data () {
    return {
      banner: bannerimg
    }
  }
}
</script>

<style scoped>
div {
  /* height: 0px; */
}
img {
    width: 100%
}
</style>
