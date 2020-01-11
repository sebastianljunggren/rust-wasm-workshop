import Vue from 'vue'
import VueRx from 'vue-rx'
import App from './App.vue'
import router from './router'

Vue.use(VueRx)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
