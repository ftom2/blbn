/* eslint no-console:0*/

import { auth } from 'firebase'

const state = {
  user: null
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

const actions = {
  login({ commit }, { email, password }) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        commit('setUser', { id: response.id })
        commit('setError', null)
      })
      .catch(err => {
        console.error('err', err)
        commit('setError', err.message)
      })
  },
  autoSignin({ commit }, { id }) {
    commit('setUser', { id })
  },
  logout({ commit }) {
    auth().signOut()
    commit('setUser', null)
  },
  setUser({ commit }) {
    commit('setUser', null)
  }
}

const getters = {
  user(state) {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
