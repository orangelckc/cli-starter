import type { ILoginForm, ILoginResult, IMenuRouteData, IUserData } from '@/api'

import { getUserInfoApi, getUserMenuApi, loginApi, logoutApi, refreshTokenApi } from '@/api'

export const useUserStore = defineStore('user', () => {
  const userToken = reactive<ILoginResult>({
    accessToken: '',
    expires: 0,
    refreshToken: '',
  })

  const userInfo = reactive<IUserData>({
    uid: 0,
    username: '',
    avatar: '',
    roles: [0],
    permissions: [],
  })

  const userMenu = shallowReactive<IMenuRouteData[]>([])

  /** 写入 Token */
  const setUserToken = (tokenInfo: ILoginResult) => {
    userToken.accessToken = tokenInfo.accessToken
    userToken.expires = tokenInfo.expires
    userToken.refreshToken = tokenInfo.refreshToken
  }

  /** 写入用户信息 */
  const setUserInfo = (data: IUserData) => {
    userInfo.uid = data.uid
    userInfo.username = data.username
    userInfo.avatar = data.avatar
    userInfo.roles = data.roles
    userInfo.permissions = data.permissions
  }

  /** 获取用户详情 */
  const getUserInfo = async () => {
    const res = await getUserInfoApi()

    setUserInfo(res.data)
  }

  /** 获取用户菜单 */
  const getUserMenu = async () => {
    const res = await getUserMenuApi()

    userMenu.length = 0
    userMenu.push(...res.data)
  }

  /** 清除缓存 */
  const reset = () => {
    localStorage.clear()
    location.reload()
  }

  /** 登录 */
  const login = async (loginData: ILoginForm) => {
    const success = await loginApi(loginData)

    if (!success)
      return false

    setUserToken(success.data)

    return true
  }

  /** 登出 */
  const logout = async () => {
    await logoutApi().finally(reset)
  }

  /** 刷新 Token */
  const refreshToken = async () => {
    await refreshTokenApi(userToken.refreshToken)
      .then(res => setUserToken(res.data))
      .catch(reset)
  }

  return {
    userInfo,
    userToken,
    userMenu,
    login,
    logout,
    getUserInfo,
    getUserMenu,
    setUserToken,
    setUserInfo,
    refreshToken,
  }
}, {
  persist: {
    paths: [
      'userToken',
      'userInfo',
      'userMenu',
    ],
  },
})
