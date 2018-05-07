import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FuckYou from '@/components/FuckYou'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // URL
      name: 'HelloWorld', // name
      component: HelloWorld
    },
    {
      path: '/page2/34asdasdasdasdasdasda',
      name: 'page2',
      component: FuckYou
    }
  ]
})
