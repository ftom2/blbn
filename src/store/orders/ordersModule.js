/* eslint no-console:0*/

import { database } from 'firebase'

const state = {
  selectedOrder: {}
}

const mutations = {
  setOrderToPrint(state, payload){
    state.selectedOrder = payload
  }
}

const actions = {
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
      return orderRef.key;
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
      commit('setOrderToPrint', snapshot.val())
    })
  }
}

const getters = {
  selectedOrder(state){
    return state.selectedOrder
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
