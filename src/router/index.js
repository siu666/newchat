import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  mode: 'history',
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

    }
  ]
})
