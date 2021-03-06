// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vconsole from 'vconsole'
const vConsole = new Vconsole()

// import ElementUI from 'element-ui';
import { Button, Select,Input,CheckboxGroup,Checkbox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import preview from 'vue-photo-preview'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
let options = {
  fullscreenEl: false
};
Vue.use(vConsole)
Vue.use(preview, options)
Vue.use(preview)
import store from './store'
// import BackGround from './components/bg';
Vue.use(Button)
// Vue.use(BackGround)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
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
  store,
  router,
  components: { App },
  template: '<App/>'
})
