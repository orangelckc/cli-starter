import { describe, expect, it } from 'vitest'

import { greeting } from './index'

describe('问候函数', () => {
  it('应返回一个问候消息', () => {
    const result = greeting('John')
    expect(result).toBe('Greetings: Hello John')
  })

  it('对于不同的名字，应返回不同的问候消息', () => {
    const result = greeting('Jane')
    expect(result).toBe('Greetings: Hello Jane')
  })

  it('应处理空字符串输入', () => {
    const result = greeting('')
    expect(result).toBe('Greetings: Hello Someone')
  })
})
