import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    User: '',
    Email: ''
  },
  mutations: {
    setUser (state, payload) {
      state.User = payload.Username
      state.Email = payload.Email
    }
  },
  actions: {},
  getters: {
    currentUsername (state) {
      return state.User
    },
    currentEmail (state) {
      return state.Email
    }
  }
})
