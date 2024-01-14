/**
 * 测试公共函数
 * @param {string} name 姓名
 */
function greeting(name: string) {
  return `Greetings: Hello ${name || 'Someone'}`
}

export { greeting }
