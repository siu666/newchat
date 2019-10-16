// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';
import { Button, Select,Input } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import BackGround from './components/bg';
Vue.use(Button)
// Vue.use(BackGround)
Vue.use(Input)
// Vue.use(ElementUI);
Vue.config.productionTip = false
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://localhost:8081',
}))
/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
