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
    async deleteComment ({ commit, dispatch }, record, id) {
      try {
        await firebase.database().ref(`/users/records/${record.id}/comments`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchComments ({ dispatch, commit }, record) {
      try {
        const comments = (await firebase.database().ref(`/users/records/${record.id}/comments`).once('value')).val() || {}
        return Object.keys(comments).map(key => ({ ...comments[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCommentById ({ dispatch, commit }, record, id) {
      try {
        const comment = (await firebase.database().ref(`/users/records/${record.id}/comments`).child(id).once('value')).val() || {}
        return { ...comment, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
