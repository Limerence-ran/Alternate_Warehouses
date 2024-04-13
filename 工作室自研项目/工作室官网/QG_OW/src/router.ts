import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const originalReplace = Router.prototype.replace
Router.prototype.push = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./components/about/about.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./components/about/about.vue')
    },
    {
      path: '/blob',
      name: 'blob',
      component: () => import('./components/blob/blob.vue')
    },
    {
      path: '/column',
      name: 'column',
      component: () => import('./components/column/column.vue')
    },
    {
      path: '/honors',
      name: 'honors',
      component: () => import('./components/honors/honors.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('./components/members/members.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./components/projects/projects.vue')
    },
    {
      path: '/we',
      name: 'we',
      component: () => import('./components/we/we.vue')
    },
  ]
})
