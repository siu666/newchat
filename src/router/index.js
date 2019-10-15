import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

// import VueSocketio from 'vue-socket.io'
//   Vue.use(VueSocketio, 'ws://localhost:8081')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld

    },
    {
      path: '/login',
      name: 'login',
      component: Login

    }
  ]
})
