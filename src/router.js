import Vue from 'vue'
import Router from 'vue-router'
//Import Components
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import EditLog from './views/EditLog.vue'
import UserList from './views/UserList.vue'
import Links from './views/Links.vue'
import User from './views/User.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history', If this mode is on, the page cannot be displayed on production env.
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path:'/editlog',
      name: 'editlog',
      component: EditLog
    },
    {
      path:'/userlist',
      name: 'userlist',
      component: UserList
    },
    {
      path:'/links',
      name: 'links',
      component: Links
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    }
  ]
})
