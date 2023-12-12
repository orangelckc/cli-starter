import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
