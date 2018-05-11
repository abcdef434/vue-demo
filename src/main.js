// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VueMoment from 'vue-moment'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'babel-polyfill'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Notifications from 'vue-notification'

import VueYouTubeEmbed from 'vue-youtube-embed'

// Vuetify
import Vuetify from 'vuetify'
// Vuetify

// flexible
import 'lib-flexible/flexible.js'
// flexible

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueAxios, axios)
Vue.use(VueMoment)
Vue.use(VueYouTubeEmbed)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
