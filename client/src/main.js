// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Message from './components/Message'
import Select from './components/Select'

Vue.config.productionTip = false

Vue.component('Select', Select)
Vue.component('Message', Message)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Message, Select },
  template: '<App/>'
})
