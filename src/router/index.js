import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/frame/Home'

Vue.use(Router)

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
  let userInfo = await localStorage.getItem('authUser') || '{"status": false}'
  userInfo = JSON.parse(userInfo)
  if (to.fullPath !== '/') {
    if (userInfo.status) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    console.log(userInfo.status)
    if (userInfo.status) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

export default router
