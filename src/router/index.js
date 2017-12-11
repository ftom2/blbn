import Vue from 'vue'
import Router from 'vue-router'
import Plants from '@/components/plants/Plants'
import Clients from '@/components/clients/Clients'
import Orders from '@/components/orders/Orders'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
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
      component: Orders,
      beforeEnter: Auth
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
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: Auth
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
