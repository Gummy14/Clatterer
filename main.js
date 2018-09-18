// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Vuetify)

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'clatterer-768ab',
  databaseURL: 'https://clatterer-768ab.firebaseio.com',
  storageBucket: 'gs://clatterer-768ab.appspot.com'
})

Vue.config.productionTip = false
export const db = firebase.firestore()
export const storage = firebase.storage()

library.add(faPlusSquare)
library.add(faPlusCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
