import * as types from './types'

const ADMIN = 'admin@restock.test'

export default {
  state: {
    error: null,
    user: null,
    is_admin: false
  },
  getters: {
    authError(state) {
      return state.error
    },
    hasAuthError(state) {
      return state.error !== null && state.error !== undefined
    },
    isUser(state) {
      return state.user !== null && state.user !== undefined
    },
    user(state) {
      return state.user
    },
    isAdmin(state) {
      return state.is_admin
    }
  },
  mutations: {
    [types.SET_AUTH_ERROR](state, payload) {
      state.error = payload
    },
    [types.CLEAR_AUTH_ERROR](state) {
      state.error = null
    },
    [types.SET_USER](state, payload) {
      state.user = payload
    },
    [types.SET_IS_ADMIN](state, payload) {
      state.is_admin = payload
    },
    [types.CLEAR_USER](state) {
      state.user = null
    }
  },
  actions: {
    [types.RESET_AUTH_ERROR]({commit}) {
      commit(types.CLEAR_AUTH_ERROR)
    },
    [types.SIGNIN]({commit}, payload) {
        axios.post(types.AUTH, payload).then(
         function(response){
            let data=response.data
            commit(types.SET_USER, { id: data.id, email: payload.email })
            commit(types.SET_IS_ADMIN, payload.email==ADMIN)
         }

      ).catch(function(error){ commit(types.SET_AUTH_ERROR, error.response.data) })
    },
    [types.AUTO_SIGNIN]({commit}, payload) {
      commit(types.SET_USER, { id: payload.uid, email: payload.email })
    },
    [types.SIGNOUT]({commit}) {
      commit(types.CLEAR_USER)
    }
  }
}