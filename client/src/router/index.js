import Vue from 'vue'
import Router from 'vue-router'
import VueSelect from 'vue-select'
import Select from '@/components/Select'

Vue.use(Router)
Vue.component('v-select', VueSelect.VueSelect)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Select
    }
  ]
})
