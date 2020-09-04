import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Waves from './static/waves/waves'
// import './static/waves/waves.css'
import './static/waves/waves.min.css'

Vue.config.productionTip = false
// 把waves.js挂载到vue原型链上
Vue.prototype.$Waves = Waves
// 把store挂在vue原型链上
Vue.prototype.$Store = store

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')