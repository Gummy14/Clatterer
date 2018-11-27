import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: '',
    email: '',
    activeChat: '',
    profilePicture: '',
    isCreateChatOpen: false,
    noCreateChatProfilePicture: false,
    noCreateChatName: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.Username
      state.email = payload.Email
    },
    setUserName (state, payload) {
      state.user = payload.Username
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
    },
    setUserInfo (state, payload) {
      state.user = payload.Username
      state.email = payload.Email
      state.profilePicture = payload.UserPicture
    },
    setNoCreateChatProfilePicture (state, payload) {
      state.noCreateChatProfilePicture = payload.NoChatAvatar
    },
    setNoCreateChatName (state, payload) {
      state.noCreateChatName = payload.NoChatName
    },
    setIsCreateChatOpen (state, payload) {
      state.isCreateChatOpen = payload.IsCreateChatOpen
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
    },
    currentNoCreateChatProfilePicture (state) {
      return state.noCreateChatProfilePicture
    },
    currentNoCreateChatName (state) {
      return state.noCreateChatName
    },
    currentIsCreateChatOpen (state) {
      return state.isCreateChatOpen
    }
  }
})
