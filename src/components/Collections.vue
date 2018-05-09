
<!--// <template>
//   <el-row  align="middle" >
//   <el-col :span="6" v-for="(video, o) of Videos" :key="o" >
//     <el-card :body-style="{ padding: '0px'}" shadow="always">
//       <img :src="video.snippet.thumbnails.high.url" class="image">
//       <div style="padding: 14px;">
//         <span class="titlespan">{{video.snippet.title}}</span>
//         <div class="bottom clearfix">
//           <time class="time">{{ video.snippet.publishedAt| moment("YYYY-MM-DD") }} by {{video.snippet.channelTitle}}</time>
//           <el-button type="text" class="button" @click="ShowYoutube(video.snippet.resourceId.videoId)">觀看</el-button>
//         </div>
//       </div>
//     </el-card>
//   </el-col>
// </el-row>
// </template>-->

<template>
  <div>
    <md-card v-for="(video, o) of Videos" :key="o" md-with-hover style="width:30vw">
      <md-card-media md-ratio="16:9">
        <img :src="video.snippet.thumbnails.high.url" class="image">
      </md-card-media>

      <md-card-header>
        <div class="md-title md-title-height">{{video.snippet.title}}</div>
      </md-card-header>

 <md-card-actions md-alignment="right">
          <div class="md-subhead">
              <span style="display: inline-flex; align-items: center; vertical-align: bottom">{{ video.snippet.publishedAt| moment("YYYY-MM-DD") }} by {{video.snippet.channelTitle}}</span>
             <md-button class="md-raised md-primary" @click="ShowYoutube(video.snippet.resourceId.videoId)">前往觀看</md-button>
          </div>
        </md-card-actions>
    </md-card>
    </div>
</template>

<script>
// https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLEkbJCID7Mcokzk9hae3HKzX1aUeCCWwz&key=AIzaSyDmvBZTOsOd0KBK9QTTUDVW3fx0SV3EmBk
// playlistId: 播放清單
// key: API Key
// maxResults: 一次幾筆回傳 defaul:5 Maxim:50
// pageToken: 抓第幾頁資料
// part: The part parameter specifies a comma-separated list of one or more video resource properties that the API response will include.

import axios from 'axios'

var moment = require('moment')
export default {
  data () {
    return {
      Videos: [],
      BaseURL: 'https://www.googleapis.com/youtube/v3/playlistItems?',
      ApiKey: { 'key': 'AIzaSyDmvBZTOsOd0KBK9QTTUDVW3fx0SV3EmBk' },
      collectionsapiparams: [
        // {
        //   'playlistId': 'PLEkbJCID7Mcokzk9hae3HKzX1aUeCCWwz',
        //   'part': 'snippet',
        //   'maxResults': '50',
        //   'nextPageToken': '',
        //   'prevPageToken': '',
        //   'pageToken': ''
        // },
        {
          'playlistId': 'PLEkbJCID7McpNWVS-GXnldhiKsRsxt-Vl',
          'part': 'snippet',
          'maxResults': '50'
        }
      ]
    }
  },
  mounted: function () {
    this.Start()
  },
  methods: {
    Start: function () {
      var _CombinedURL = this.CombineURL(this.BaseURL, this.ApiKey) // 補api
      this.collectionsapiparams
        .forEach((collectionsapiparam) => {
          this.GetCollection(_CombinedURL, collectionsapiparam)
        })
    },
    GetCollection: function (BASEURL, CollectionParam) {
      var _URL = this.CombineURL(BASEURL, CollectionParam)
      var hasnext = false
      axios.get(_URL).then((response) => {
        if (response.data.nextPageToken === 'undefined') {
          hasnext = false
        } else {
          hasnext = true
          CollectionParam.pageToken = response.data.nextPageToken
        }
        this.Videos = this.Videos.concat(response.data.items)

        if (hasnext) {
          this.GetCollection(BASEURL, CollectionParam)
        }

        this.Videos = this.Videos.sort(function (a, b) {
          return moment(a.snippet.publishedAt).isBefore(moment(b.snippet.publishedAt)) ? 1 : -1
        })
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    CombineURL: function (_BaseURL, Data) {
      var Combined = ''
      Object.keys(Data).forEach(
        function (_key) {
          Combined = Combined.concat(_key + '=' + Data[_key] + '&')
        })
      return _BaseURL + Combined
    },
    ShowYoutube: function (url) {
      this.$emit('emitopen', url)
    }
  }
}
</script>

<style lang="scss" scoped>

  .card-expansion {
    height: 480px;
  }

  .md-card {
    width: 27vw;
    margin: 1vw;
    display: inline-block;
    vertical-align: top;
  }
  .md-title.md-title-height{
      height:100px;
      vertical-align: center;
  }
</style>

<style scoped>
  div {
      /* height: 500px */
      /* padding: 10px; */
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .titlespan {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      align-items: left;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
