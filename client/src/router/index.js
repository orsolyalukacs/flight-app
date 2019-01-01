import Vue from 'vue'
import Router from 'vue-router'
import Select from '@/components/Select'
import DatePicker from 'vue2-datepicker'
import Flights from '@/components/Flights'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Select
    },
    {
      path: '/date',
      name: 'datepicker',
      component: DatePicker
    },
    {
      path: '/flights',
      name: 'flights',
      component: Flights
    }
  ]
})
