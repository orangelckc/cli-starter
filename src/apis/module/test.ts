import request from '../index'

/**
 * @description: 测试接口返回数据类型
 */
export function getChannelsApi() {
  return request.Get<ITestData>('/test')
}
