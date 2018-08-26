import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import home       from '@/components/home/home-page'
import signin     from '@/components/auth/signin-page'
import authError  from '@/components/auth/auth-error-page'
import restock  from '@/components/restock/restock-page'
import items      from '@/components/items/items-page'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',          name: 'home',      component: home },
    { path: '/signin',    name: 'signIn',    component: signin },
    { path: '/auth-error',name: 'authError', component: authError},
    { path: '/restock', name: 'restock', component: restock, meta: { requiresAuth: true } },
    { path: '/items',     name: 'items',     component: items,     meta: { requiresAuth: true } } 
  ]
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isUser) {
      next()
    } else {
      next({path: '/auth-error'})
    }
  } else {
    next()
  }
})

export default router