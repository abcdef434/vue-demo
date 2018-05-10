<template>
<el-dialog :title=title :custom-class=customabout :visible.sync="isShow" width="70%">
  <el-row :gutter="20">
      <el-col :span="8">
          <img :src="Boss">
      </el-col>
      <el-col :span="11" :offset="3">
          <ul>
              <li v-bind:key="About.index" v-for="About in abouts">
                <p>
                      {{About.text}}
                </p>
              </li>
          </ul>
      </el-col>
  </el-row>
</el-dialog>
</template>

<script>
import Bossimg from '@/assets/Boss.jpg'
export default {
  name: 'AboutModal',
  data () {
    return {
      rotate: '',
      isShow: false,
      customabout: 'customabout',
      abouts: [
        {
          index: 0,
          text: 'Hi 我是開立，是世界旅遊家，夢想是當一個能獨當一面的影片後製師💪'
        },
        {
          index: 1,
          text: '平常是一個英文家教，熱衷於各種社會議題、文化和喜歡分享生活大小事。'
        }
      ],
      Boss: Bossimg,
      title: 'About Kylie Wang'
    }
  },
  methods: {
    closeThis: function () {
      this.isShow = false
    },
    openThis: function () {
      this.isShow = true
    }
  }
}
</script>
<style scoped>
img {
  width: 30vw
}
div.el-col p {
    font-size: 24px;
    text-align: left;
}
.el-dialog {
    border-radius: 10px;
}

.customabout{
    border-radius: 10px
}
</style>
