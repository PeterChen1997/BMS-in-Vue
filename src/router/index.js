import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import store from '../store'
import { sync } from 'vuex-router-sync'
import Login from '@/components/Login'
import Home from '@/components/frame/Home'

Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (store.state.isLogin === false) {
    store.commit('SET_USER', JSON.parse(localStorage.getItem('authUser')))
  }

  if (to.fullPath !== '/') {
    if (store.state.isLogin) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    if (store.state.isLogin) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

const unsync = sync(store, router)

unsync()

export default router
