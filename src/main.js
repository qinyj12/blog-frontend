import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Waves from './static/waves/waves'
// import './static/waves/waves.css'

Vue.config.productionTip = false
// 把waves.js挂载到vue原型链上
Vue.prototype.$Waves = Waves

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')