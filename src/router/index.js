import Vue from 'vue'
import Router from 'vue-router'
import Plants from '@/components/Plants'
import Clients from '@/components/Clients'
import Login from '@/components/Login'
import Auth from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Clients
    },
    {
      path: '/plants',
      name: 'plants',
      component: Plants,
      beforeEnter: Auth
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      beforeEnter: Auth
    },
    {
      path: '*',
      component: Clients
    }
  ]
})
