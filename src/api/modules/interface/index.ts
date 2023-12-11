import type { IPaginationResponseData } from '@/api/types'

import request from '@/utils/request'

const prefix = '/interface'

/**
 * IInterfaceData
 */
export interface IInterfaceData {
  /**
   * 接口ID
   */
  id: number
  /**
   * 请求方式
   */
  method: string
  /**
   * 接口名称
   */
  name: string
  /**
   * 请求路径
   */
  path: string
}

/** 获取所有的接口 */
export function getInterfaceListApi() {
  return request<IPaginationResponseData<IInterfaceData>>({
    url: `${prefix}/list`,
    method: 'GET',
  })
}
