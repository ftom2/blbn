/* eslint no-console:0*/

import { database } from 'firebase'

const state = {
  clients: []
}

const mutations = {
  setClients(state, payload) {
    let arr = Object.keys(payload).map((k) => {
      payload[k].id = k
      return payload[k]
    })
    state.clients = arr
  }
}

const actions = {
  loadClients({commit, getters}) {
    if (!getters.clients.length) {
      commit('setLoading', true)
      const db = database()
      const clientsRef = db.ref('clients').orderByChild('hebName')
      clientsRef.on('value', snapshot => {
        commit('setLoading', false)

        commit('setClients', snapshot.val())
      })
    }
  },
  updateClient({commit}, payload) {
    commit('setLoading', true)
    const data = {}
    data['clients/' + payload.id] = {
      engName: payload.engName,
      hebName: payload.hebName,
      location: payload.location,
      phone: payload.phone,
      updatedAt: database.ServerValue.TIMESTAMP
    }

    database().ref().update(data).then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Client updated'})
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  createClient({commit}, payload) {
    commit('setLoading', true)
    const data = {
      engName: payload.engName,
      hebName: payload.hebName,
      location: payload.location,
      phone: payload.phone,
      createdAt: database.ServerValue.TIMESTAMP,
      updatedAt: database.ServerValue.TIMESTAMP
    }

    database().ref('clients').push().set(data).then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Client created'})
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  deleteClient({commit}, payload) {
    commit('setLoading', true)
    return database().ref('clients/' + payload).remove().then(() => {
      commit('setLoading', false)
      commit('setAlert', {message: 'Client deleted'})
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  }
}

const getters = {
  clients(state) {
    return state.clients
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
