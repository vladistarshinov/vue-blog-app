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
    name: 'home-not-auth-page',
    meta: { layout: 'home' },
    component: () => import('../views/HomeNotAuthPage.vue')
  },
  {
    path: '/home',
    name: 'home-auth-page',
    meta: { layout: 'auth', auth: true },
    component: () => import('../views/HomeAuthPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'home' },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/create',
    name: 'newPost',
    meta: { layout: 'auth', auth: true },
    component: () => import('../views/NewPost.vue')
  },
  {
    path: '/edit/:id',
    name: 'updatePost',
    meta: { layout: 'auth', auth: true },
    component: () => import('../views/UpdatePost.vue')
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
  const requireAuth = to.meta.auth
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
}
)

export default router
