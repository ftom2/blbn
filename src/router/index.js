import Vue from 'vue';
import Router from 'vue-router';
const Plants = () => import('@/components/plants/Plants');
const Clients = () => import('@/components/clients/Clients');
const Orders = () => import('@/components/orders/Orders');
const NewOrder = () => import('@/components/orders/NewList');
const OrdersList = () => import('@/components/orders/OrdersList');

import Login from '@/components/Login';
import NotFound from '@/components/NotFound';
import Auth from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: { name: 'ordersList' }
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
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
