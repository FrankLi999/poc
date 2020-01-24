import Vue from 'vue'
import Router from 'vue-router'
import MyContractor from '@/components/MyContractorBootstrap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyContractor',
      component: MyContractor
    }
  ]
})
