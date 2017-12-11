/* eslint no-console:0*/

import { database } from 'firebase'

const state = {
  orders: []
}

const mutations = {
  setOrders (state,payload){
    if (payload){
      let arr = Object.keys(payload).map((k) => {
        payload[k].id = k
        return payload[k]
      })
      state.orders = arr
    }
    else{
      state.orders = []
    }
  }
}

const actions = {
  loadOrders({commit}) {
    commit('setLoading', true)
    const db = database()
    const ordersRef = db.ref('orders')
    ordersRef.on('value', snapshot => {
      console.log('order updated', snapshot.val() );

      commit('setLoading', false)
      commit('setOrders', snapshot.val())
    })
  },
  getOrderById({commit}, payload){
    commit('setLoading', true)
    const db = database()
    const ordersRef = db.ref(`orders/${payload}`)
    return ordersRef.once('value', () => {
      commit('setLoading', false)
    })
  },
  createOrder({commit}, payload) {
    commit('setLoading', true)
    const data ={
      client: {
        name: payload.name,
        order: payload.order,
        createdAt: database.ServerValue.TIMESTAMP,
        updatedAt: database.ServerValue.TIMESTAMP
      }
    }

    const orderRef = database().ref('orders').push(data)
    return orderRef.then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Order saved'})
      return orderRef.key;
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  updateOrder({commit}, {data,id}) {
    commit('setLoading', true)
    let obj = {}
    obj['orders/' + id] = {
      client: {
        name: data.name,
        order: data.order,
        createdAt: database.ServerValue.TIMESTAMP,
        updatedAt: database.ServerValue.TIMESTAMP
      }
    }

    database().ref().update(obj).then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Order updated'})
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  getOrder({commit}, payload){
    commit('setLoading', true)
    const db = database()
    const ordersRef = db.ref(`orders/${payload}`)
    ordersRef.once('value', snapshot => {
      commit('setLoading', false)
      console.log('snapshot', snapshot);

    })
  },
  deleteOrder({commit}, payload) {
    commit('setLoading', true)
    return database().ref(`orders/${payload}`).remove().then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Order deleted'})
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  }
}

const getters = {
  orders(state){
    return state.orders
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
