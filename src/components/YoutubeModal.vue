<template>
<el-dialog  :visible.sync="isShow" width="80%" :show-close="false">
    <youtube :video-id="youtubeid" @ready="ready" style='height:85vh;'></youtube>
</el-dialog>
</template>

<script>
// import $ from 'jquery'
export default {
  data () {
    return {
      isShow: false,
      youtubeid: '',
      iframe: 'iframe',
      player: null
    }
  },
  watch: {
    isShow: function () {
      if (this.isShow === false) {
        this.player.pauseVideo()
      }
    }
  },
  methods: {
    ready: function (player) {
      this.player = player
      console.log('player:' + player)
      this.player.a.attributeStyleMap.set('width', '100vw')
      this.player.a.attributeStyleMap.set('height', '85vh')
      // console.log(document.getElementById('youtube-player-1'))
      // console.log($('#youtube-player-1')[0])
      // var yp = $('#youtube-player-1')[0]
      // yp.addClass('iframe')
    },
    youtubeurl: function (url) {
      this.youtubeid = url
    },
    closeThis: function () {
      this.isShow = false
    },
    openThis: function () {
      this.isShow = true
    }
  }
}
</script>

<style>
#youtube-player-1 {
  width:100vw;
  height:85vh;
}

</style>
