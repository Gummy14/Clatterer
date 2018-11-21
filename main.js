// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import VueFire from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faPlusCircle, faSignOutAlt, faPaintBrush, faComments, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { store } from './store'

Vue.use(Vuetify)

Vue.use(VueFire)
let app
firebase.initializeApp({
  apiKey: 'AIzaSyCq63oosrG4EduRNtu5TO59o6JB46thUog',
  authDomain: 'clatterer-768ab.firebaseapp.com',
  messagingSenderId: '1094109932349',
  projectId: 'clatterer-768ab',
  databaseURL: 'https://clatterer-768ab.firebaseio.com',
  storageBucket: 'gs://clatterer-768ab.appspot.com'
})

Vue.config.productionTip = false
export const db = firebase.firestore()
export const storage = firebase.storage().ref()

library.add(faSignOutAlt)
library.add(faPlusSquare)
library.add(faPlusCircle)
library.add(faPaintBrush)
library.add(faComments)
library.add(faUserPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      store,
      template: '<App/>'
    })
  }
})
