import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebase } from '@firebase/app'

Vue.use(VueRouter)
/* Lazy loading */
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'home' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'admin-page',
    meta: { layout: 'admin', auth: true },
    component: () => import('../views/AdminPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* Securing of routes */
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requreAuth = to.meta.auth
  if (requreAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
}
)

export default router
