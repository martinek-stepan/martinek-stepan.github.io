import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TimelinePage from '../pages/TimelinePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Timeline',
    component: TimelinePage
  },
  /*
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" *//* '../pages/AdminPage.vue')
  }
  */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
