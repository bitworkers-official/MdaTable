import '@/assets/css/tailwind.css'
import '@/assets/css/global.css'
import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Toasted)

new Vue({
  render: h => h(App),
}).$mount('#app')
