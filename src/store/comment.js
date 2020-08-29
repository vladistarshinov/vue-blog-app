import { firebase } from '@firebase/app'

export default {
  actions: {
    async createComment ({ dispatch, commit }, record) {
      try {
        await firebase.database().ref(`/users/records/${record.id}/comments`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchComments ({ dispatch, commit }, recordId) {
      try {
        const comments = (await firebase.database().ref(`/users/records/${recordId}/comments`).once('value')).val() || {}
        return Object.keys(comments).map(key => ({ ...comments[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }/* ,
    async deleteComment ({ commit, dispatch }, id, idx) {
      try {
        await firebase.database().ref('/users/records/' + id + `${id}/comments`).child(idx).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    } */
  }
}
