import type { ILoginForm, ILoginResult, IUserData } from './types.d'

import request from '@/utils/request'

const prefix = '/auth'

/** 登录 */
export function loginApi(data: ILoginForm) {
  return request<ILoginResult>({
    url: `${prefix}/login`,
    method: 'POST',
    data,
  })
}

/** 刷新Token */
export function refreshTokenApi(token: string) {
  return request<ILoginResult>({
    url: `${prefix}/refresh-token`,
    method: 'POST',
    data: {
      token,
    },
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<IUserData>({
    url: `${prefix}`,
    method: 'GET',
  })
}

/** 登出 */
export function logoutApi() {
  return request({
    url: `${prefix}/logout`,
    method: 'GET',
  })
}

export * from './types.d'
