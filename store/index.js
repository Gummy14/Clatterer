import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    email: '',
    activeChat: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.Username
      state.email = payload.Email
    },
    setActiveChat (state, payload) {
      state.activeChat = payload.ActiveChat
    }
  },
  actions: {},
  getters: {
    currentUsername (state) {
      return state.user
    },
    currentEmail (state) {
      return state.email
    },
    currentActiveChat (state) {
      return state.activeChat
    }
  }
})
