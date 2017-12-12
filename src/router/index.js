import Vue from 'vue'
import Router from 'vue-router'
import Plants from '@/components/plants/Plants'
import Clients from '@/components/clients/Clients'
import Orders from '@/components/orders/Orders'
import NewOrder from '@/components/orders/New'
// import EditOrder from '@/components/orders/Edit'
import OrdersList from '@/components/orders/OrdersList'
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
      redirect: {name: 'ordersList'}
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
      component: Orders,
      beforeEnter: Auth,
      children: [
        { path: '', component: OrdersList, name: 'ordersList' },
        {
          path: ':id',
          name: 'editOrder',
          component: NewOrder,
          props: true
        }
        // {
        //   path: ':id',
        //   name: 'editOrder',
        //   component: EditOrder,
        //   props: true
        // }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
