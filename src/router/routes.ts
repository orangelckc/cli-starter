// @unocss-include
import router from '.'

import type { IMenuRouteData } from '@/api'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

const modules = import.meta.glob('@/views/**/**.vue')

/**
 * 隐藏路由
 *  用来放置无权限的路由
 *  无权限的路由不会显示在菜单栏中，不用提供 Name 属性
 */
export const hiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
]

/** 常驻路由，需要渲染到菜单栏 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      alwaysShow: true,
      visible: 1,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: '首页',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
          visible: 1,
        },
      },
      {
        path: '403',
        component: () => import('@/views/error-page/403.vue'),
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
      },
    ],
  },
]

/** 404 路由 */
export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'ErrorPage',
}

/** 添加动态路由 */
export function setRoutes(menus: IMenuRouteData[]) {
  generateRoutes(menus)

  menus.forEach((route) => {
    router.addRoute(route as RouteRecordRaw)
  })

  // 最后添加 404 路由，解决刷新 404 问题
  router.addRoute(notFoundRoute)
}

/** 替换路由的 component 为实际的组件 */
function replaceComponent(path: string | undefined | null) {
  const component404 = modules['/src/views/error-page/404.vue']

  if (!path)
    return component404

  const component = path === 'Layout' ? Layout : modules[`/src/views/${path}.vue`]

  return component || component404
}

/** 生成新的路由 */
function generateRoutes(menus: IMenuRouteData[]) {
  menus.forEach((menu) => {
    if (menu.children && menu.children.length)
      generateRoutes(menu.children)

    menu.component = replaceComponent(menu.component as string)
  })
}
