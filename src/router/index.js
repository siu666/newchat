import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Allcomp from '@/components/Allcomp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login

    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat

    },
    {
      path: '/ui',
      name: 'component',
      component: Allcomp

    }
  ]
})
