import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Messenger from '@/components/Messenger'
import MessageTemplate from '@/components/MessageTemplate'
import ReactSelection from '@/components/ReactSelection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
