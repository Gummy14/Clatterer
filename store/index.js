import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    email: '',
    activeChat: '',
    profilePicture: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.Username
      state.email = payload.Email
    },
    setUserPicture (state, payload) {
      state.profilePicture = payload.UserPicture
    },
    setActiveChat (state, payload) {
      state.activeChat = payload.ActiveChat
    },
    clearAll (state) {
      state.user = ''
      state.email = ''
      state.activeChat = ''
      state.profilePicture = ''
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
    },
    currentProfilePicture (state) {
      return state.profilePicture
    }
  }
})
