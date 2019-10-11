import '@/assets/css/tailwind.css'
import '@/assets/css/global.css'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
