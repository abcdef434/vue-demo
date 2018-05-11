<template>
  <div id="app">
    <bannerbar></bannerbar>
    <nav-bar  @emitopen="openAboutModal" @emitclose="closeAboutModal" ></nav-bar>
    <!-- <router-view/> -->
    <collections @emitopen="openYoutubeModal" @emitclose="closeYoutubeModal" ></collections>
    <about-modal ref="aboutModal"   tabindex="-1"></about-modal>
    <youtube-modal ref="youtubeModal" tabindex="-2"></youtube-modal>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Bannerbar from './components/Banner.vue'
import AboutModal from './components/AboutModal.vue'
import Collections from './components/Collections.vue'
import YoutubeModal from './components/YoutubeModal.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Bannerbar,
    AboutModal,
    Collections,
    YoutubeModal
  },
  methods: {
    closeAboutModal: function () {
      this.$refs.aboutModal.closeThis()
    },
    openAboutModal: function () {
      this.$refs.aboutModal.openThis()
    },
    closeYoutubeModal: function () {
      this.$refs.youtubeModal.closeThis()
    },
    openYoutubeModal: function (youtubeid) {
      this.$refs.youtubeModal.youtubeurl(youtubeid)
      this.$refs.youtubeModal.openThis()
    },

    init () {
      // 範例 set refs
      // this.$set(this.$refs.aboutModal.$data, 'rotate', 'fuck you')
    }
  }
}
</script>

<style>
html{
  font-size:16px !important;
  background: #f00;
}
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
