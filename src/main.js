import $ from 'jquery'
import Vue from 'vue'
import App from './App.vue'

window.$ = $;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
