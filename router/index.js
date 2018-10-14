import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Messenger from '@/components/Messenger'
import MessageTemplate from '@/components/MessageTemplate'
import ReactSelection from '@/components/ReactSelection'
import CreateAccount from '@/components/CreateAccount'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createAccount',
      name: 'create-account',
      component: CreateAccount
    },
    {
      path: '/messenger',
      name: 'messenger',
      component: Messenger
    },
    {
      path: '/message-template',
      name: 'message-template',
      component: MessageTemplate
    },
    {
      path: '/react-selection',
      name: 'react-selection',
      component: ReactSelection
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  console.log(user)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !user) {
    next('/login')
  } else if (!requiresAuth && user) {
    next('/home')
  } else {
    next()
  }
})

export default router
