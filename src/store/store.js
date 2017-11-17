import Vuex from 'vuex'
import Vue from 'vue'
import * as fb from 'firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: '',
    plants: [],
    clients: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setClients(state, payload) {
      let arr = Object.keys(payload).map((k) => {
        payload[k].id = k
        return payload[k]
      })
      state.clients = arr
    },
    setPlants(state, payload) {
      let arr = Object.keys(payload).map((k) => {
        payload[k].id = k
        return payload[k]
      })
      state.plants = arr
    }
  },
  actions: {
    login({commit}, {email, password}) {
      fb.auth().signInWithEmailAndPassword(email, password).then((response) => {
        commit('setUser', {id: response.id})
        commit('setError', null)
      }).catch(err => {
        console.log('err', err)
        commit('setError', err.message)
      })
    },
    autoSignin({commit}, {id}) {
      commit('setUser', {id})
    },
    logout({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    },
    loadClients({commit, getters}) {
      if (!getters.clients.length) {
        commit('setLoading', true)
        const db = fb.database()
        const clientsRef = db.ref('clients').orderByChild('hebName')
        clientsRef.on('value', snapshot => {
          commit('setLoading', false)

          commit('setClients', snapshot.val())
        })
      }
    },
    loadPlants({commit, getters}) {
      if (!getters.plants.length) {
        commit('setLoading', true)
        const db = fb.database()
        const plantsRef = db.ref('plants').orderByChild('hebName')
        plantsRef.on('value', snapshot => {
          commit('setLoading', false)
          commit('setPlants', snapshot.val())
        })
      }
    },
    updateClient({commit}, payload) {
      commit('setLoading', true)
      const data = {}
      data['clients/' + payload.id] = {
        engName: payload.engName,
        hebName: payload.hebName,
        location: payload.location
      }

      fb.database().ref().update(data).then(() => {
        commit('setLoading', false)
      }).catch(err => {
        console.log('err', err)
        this.$Message.error(err.message)
      })
    },
    createClient({commit}, payload) {
      commit('setLoading', true)
      const data = {
        engName: payload.engName,
        hebName: payload.hebName,
        location: payload.location
      }

      fb.database().ref('clients').push().set(data).then(() => {
        commit('setLoading', false)
      }).catch(err => {
        console.log('err', err)
        this.$Message.error(err.message)
      })
    },
    deleteClient({commit}, payload) {
      commit('setLoading', true)
      return fb.database().ref('clients/' + payload).remove().then(() => {
        commit('setLoading', false)
      }).catch(err => {
        console.log('err', err)
        this.$Message.error(err.message)
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    clients(state) {
      return state.clients
    },
    plants(state) {
      return state.plants
    },
    loading(state) {
      return state.loading
    }
  }
})

export default store
