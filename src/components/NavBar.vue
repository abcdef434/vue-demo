<template>
<b-nav vertical class="w-25 secondary">
  <b-nav-item active @click="show">關於</b-nav-item>
    <b-dropdown-divider></b-dropdown-divider>
  <b-nav-item>聯絡我</b-nav-item>
    <b-dropdown-divider></b-dropdown-divider>
  <b-nav-item>Link with a long name </b-nav-item>
</b-nav>
</template>

<script>
export default {
  methods: {
    show () {
      this.$emit('emitopen')
    }
  }
}
</script>
<style scoped>
ul a {
    color:antiquewhite;
    font-weight: bold;
    font-size: 20px;
}
ul {
    position: absolute;
    left: 0px;
    top: 20px;
}
</style>
