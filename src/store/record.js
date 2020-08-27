import { firebase } from '@firebase/app'

export default {
  state: {
    records: {}
  },
  mutations: {
    setRecord (state, records) {
      state.records = records
    },
    clearRecord (state) {
      state.records = {}
    }
  },
  getters: {
    records: s => s.records
  },
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const records = await firebase.database().ref('/users/records').push(record)
        commit('setRecord', records)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteRecord ({ commit, dispatch }, id) {
      try {
        await firebase.database().ref('/users/records').child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRecord ({ commit, dispatch }, { title, shortDescription, description, id }) {
      try {
        await firebase.database().ref('/users/records').child(id).update({ title, shortDescription, description })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const records = (await firebase.database().ref('/users/records').once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const record = (await firebase.database().ref('/users/records').child(id).once('value')).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
