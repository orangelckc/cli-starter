import NProgress from 'nprogress'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { constantRoutes, hiddenRoutes, setRoutes } from './routes'

import { whiteList } from '@/config/white-list'
import { useUserStore } from '@/store'

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    ...constantRoutes,
    ...hiddenRoutes,
  ],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  const userStore = useUserStore()

  const { userToken, userInfo, getUserMenu, userMenu } = userStore

  // 如果已经登录，则不允许访问登录页面
  if (to.path === '/login' && userToken.accessToken)
    return next('/')

  // 访问白名单中的页面，直接放行
  if (whiteList.includes(to.path))
    return next()

  // 去往非白名单中的页面，需要先判断是否已经登录
  if (!userToken.accessToken)
    return next('/login')

  // 前端的路由权限控制，只需要判断路由的meta.roles中是否包含当前用户的角色
  // 用户身份有问题，直接跳转到403页面
  if (!userInfo.roles || !userInfo.roles.length)
    return next('/403')

  // 检查是否已经获取了动态路由
  if (!userMenu.length) {
    await getUserMenu()

    setRoutes(userMenu)

    // !!! 很重要，动态添加路由后，router需要再触发一次
    return next({ ...to, replace: true })
  }

  // 前往的路由没有角色限制，直接放行
  const routeRoles = to.meta.roles
  if (!routeRoles || !routeRoles.length)
    return next()

  // 前往的路由有角色限制，需要判断当前用户是否有权限访问
  const hasPermission = userInfo.roles.some(role => routeRoles.includes(role))

  if (!hasPermission)
    return next('/403')

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
