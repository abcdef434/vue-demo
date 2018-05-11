<template>

<div>
  <v-app id='inspire'>
      <v-tabs v-model='active' fixed-tabs color='primary' dark slider-color='yellow'>
        <v-tab v-for='(playlist, o) of collectionsapiparams' :key='o' ripple>
          {{playlist.name}}
        </v-tab>
    <v-tabs-items v-model="active">
        <v-tab-item v-for='(playlist, o) of collectionsapiparams' :key='o'>
            <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex v-for="(video, oo) of CurrentVideos" :key="oo" :flex='4' >
          <v-card flat width='30vw' hover>
            <v-card-media :src=video.snippet.thumbnails.high.url height='4rem'>
        </v-card-media>
        <v-card-title primary-title >
          <div style="width:100%; text-align:center">
              <span class='headline mb-0'>{{video.snippet.title}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
        <!-- <div class="text-xs-center"> -->
          <span>{{ video.snippet.publishedAt| moment('YYYY-MM-DD') }} by {{video.snippet.channelTitle}}</span>
          <v-btn flat color="primary" @click='ShowYoutube(video.snippet.resourceId.videoId)'>前往觀看</v-btn>
        <!-- </div> -->
        </v-card-actions>
          </v-card>
          </v-flex>
        </v-layout>
            </v-container>
        </v-tab-item>
    </v-tabs-items>
      </v-tabs>
  </v-app>
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
      Videos: {},
      CurrentVideos: [],
      BaseURL: 'https://www.googleapis.com/youtube/v3/playlistItems?',
      ApiKey: { key: 'AIzaSyDmvBZTOsOd0KBK9QTTUDVW3fx0SV3EmBk' },
      active: 0,
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
          playlistId: 'PLEkbJCID7Mcokzk9hae3HKzX1aUeCCWwz',
          part: 'snippet',
          maxResults: '50',
          name: '客戶作品集'
        },
        {
          playlistId: 'PLEkbJCID7McpNWVS-GXnldhiKsRsxt-Vl',
          part: 'snippet',
          maxResults: '50',
          name: '2016/17歷史回顧'
        }
      ]
    }
  },
  watch: {
    active: function () {
      if (this.active !== null) {
        if (Object.keys(this.Videos[this.active]).length === 0) {
          this.Start()
        }
        this.CurrentVideos = this.Videos[this.active]
      }
    }
  },
  mounted: function () {
    this.collectionsapiparams.forEach((ele, index, arrays) => {
      this.Videos[index] = []
    })
  },
  methods: {
    Start: function () {
      console.log('active:' + this.active)
      var _CombinedURL = this.CombineURL(this.BaseURL, this.ApiKey) // 補api
      this.GetCollection(_CombinedURL, this.collectionsapiparams[this.active])
    },
    GetCollection: function (BASEURL, CollectionParam) {
      var _URL = this.CombineURL(BASEURL, CollectionParam)
      var hasnext = false
      axios
        .get(_URL)
        .then(response => {
          if (response.data.nextPageToken === 'undefined') {
            hasnext = false
          } else {
            hasnext = true
            CollectionParam.pageToken = response.data.nextPageToken
          }
          if (Object.keys(this.Videos[this.active]).length === 0) {
            this.Videos[this.active] = response.data.items
          } else {
            this.Videos[this.active] = this.Videos[this.active].concat(
              response.data.items
            )
          }
          // console.log('data:' + response.data.items)
          // console.log(this.Videos[this.active])
          // this.Videos[this.active] = response.data.items

          if (hasnext) {
            this.GetCollection(BASEURL, CollectionParam)
          }

          this.Videos[this.active] = this.Videos[this.active].sort(function (
            a,
            b
          ) {
            return moment(a.snippet.publishedAt).isBefore(
              moment(b.snippet.publishedAt)
            )
              ? 1
              : -1
          })
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          this.CurrentVideos = this.Videos[this.active]
        })
    },
    CombineURL: function (_BaseURL, Data) {
      var Combined = ''
      Object.keys(Data).forEach(function (_key) {
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

<style scoped>
.titlespan {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  align-items: left
}
.headline {
  height:1rem;
  font-size: 0.5rem !important
}
button.btn {
  font-size: 0.5rem;
}
span {
  font-size: 0.1rem;
  width: 80vw;
}
</style>
