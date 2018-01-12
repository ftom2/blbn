/* eslint no-console:0*/

import Vuex from 'vuex'
import Vue from 'vue'
import clients from './clients/clientsModule'
import plants from './plants/plantsModule'
import orders from './orders/ordersModule'
import users from './users/usersModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    users,
    clients,
    plants,
    orders
  },
  state: {
    alert: {
      type: 'success',
      message: ''
    },
    loading: false,
    error: ''
  },
  actions: {
    setAlert({ commit }, payload) {
      commit('setAlert', payload)
    }
  },
  mutations: {
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setAlert(state, payload) {
      state.alert = {
        type: payload.type || 'success',
        message: payload.message
      }
    }
  },
  getters: {
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
    alert(state) {
      return state.alert
    }
  }
})

export default store
