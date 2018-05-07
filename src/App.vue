<template>
  <div id="app">
    <bannerbar></bannerbar>
    <nav-bar  @emitopen="openAboutModal" @emitclose="closeAboutModal" ></nav-bar>
    <!-- <router-view/> -->
    <collections ></collections>
    <about-modal ref="aboutModal"   tabindex="-1"></about-modal>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Bannerbar from './components/Banner.vue'
import AboutModal from './components/AboutModal.vue'
import Collections from './components/Collections.vue'

export default {
  name: 'App',
  data () {
    return {
      isAboutModalVisible: true
    }
  },
  components: {
    NavBar,
    Bannerbar,
    AboutModal,
    Collections
  },
  methods: {
    showAboutModal: function () {
      this.isAboutModalVisible = true
    },
    closeAboutModal: function () {
      this.$refs.aboutModal.closeThis()
    },
    openAboutModal: function () {
      this.$refs.aboutModal.openThis()
    },
    init () {
      // 範例 set refs
      // this.$set(this.$refs.aboutModal.$data, 'rotate', 'fuck you')
    }
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
