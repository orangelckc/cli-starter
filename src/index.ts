import type { Types } from './types/index.d'

/**
 * 测试公共函数
 * @param {Types.IHello} param 问候参数
 */
function greeting(param: Types.IHello) {
  return `Greetings: Hello ${param.name || 'Someone'}`
}

export { greeting }
export type { Types }
