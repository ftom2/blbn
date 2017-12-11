/* eslint no-console:0*/

import { database } from 'firebase'

const state = {
  plants: []
}

const mutations = {
  setPlants(state, payload) {
    let arr = Object.keys(payload).map((k) => {
      payload[k].id = k
      return payload[k]
    })
    state.plants = arr
  }
}

const actions = {
  loadPlants({commit, getters}) {
    if (!getters.plants.length) {
      commit('setLoading', true)
      const db = database()
      const plantsRef = db.ref('plants').orderByChild('hebName')
      plantsRef.on('value', snapshot => {
        commit('setLoading', false)
        commit('setPlants', snapshot.val())
      })
    }
  },
  updatePlant({commit}, payload) {
    commit('setLoading', true)
    const data = {}
    data['plants/' + payload.id] = {
      plantNameEng: payload.plantNameEng,
      plantNameHeb: payload.plantNameHeb,
      size: payload.size,
      thailand: payload.thailand,
      quantity: payload.quantity || 0,
      updatedAt: database.ServerValue.TIMESTAMP
    }

    database().ref().update(data).then(() => {
      commit('setLoading', false)
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  createPlant({commit}, payload) {
    commit('setLoading', true)
    const data = {
      plantNameEng: payload.plantNameEng,
      plantNameHeb: payload.plantNameHeb,
      size: payload.size,
      thailand: payload.thailand,
      quantity: payload.quantity,
      createdAt: database.ServerValue.TIMESTAMP,
      updatedAt: database.ServerValue.TIMESTAMP
    }

    database().ref('plants').push().set(data).then(() => {
      commit('setLoading', false)
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  },
  deletePlant({commit}, payload) {
    commit('setLoading', true)
    return database().ref('plants/' + payload).remove().then(() => {
      commit('setLoading', false)
    }).catch(err => {
      console.error('err', err)
      this.$Message.error(err.message)
    })
  }
}

const getters = {
  plants(state) {
    return state.plants
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
