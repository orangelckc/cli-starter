import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/Config.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
