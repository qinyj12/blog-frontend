import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Waves from './static/waves/waves'
// import './static/waves/waves.css'
import './static/waves/waves.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import VClamp from 'vue-clamp'
import _ from 'lodash'

Vue.config.productionTip = false
// 把waves.js挂载到vue原型链上
Vue.prototype.$Waves = Waves
// 把store挂在vue原型链上
Vue.prototype.$Store = store
// 把lodash挂在vue原型链上
Vue.prototype._ = _

// 使用swiper
Vue.use(VueAwesomeSwiper)
// 全局注册VClamp组件
Vue.component('v-clamp', VClamp)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')