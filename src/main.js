import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Waves from './utils/waves/waves'
import './utils/waves/waves.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VClamp from 'vue-clamp'
import AsyncComputed from 'vue-async-computed'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 新加
// import MyWorker from 'comlink-loader'

import MyWorker from './worker'
Vue.prototype.$MyWorker = MyWorker

// 使用swiper
Vue.use(VueAwesomeSwiper)
// 使用asyncComputed
Vue.use(AsyncComputed)
// 使用element-ui
Vue.use(ElementUI)

// 全局注册VClamp组件
Vue.component('v-clamp', VClamp)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')