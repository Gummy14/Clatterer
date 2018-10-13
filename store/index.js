import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    User: ''
  },
  mutations: {
    setUser (state, payload) {
      state.User = payload.User
    }
  },
  actions: {},
  getters: {
    currentUser (state) {
      return state.User
    }
  }
})
