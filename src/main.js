import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import './assets/css/global.css'
// 引入element-ui => 按需引入
import './uiPlugin/element.js'
// 引入axios,并挂载在vue上
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
