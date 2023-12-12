import type { Request } from 'express-jwt'

/**
 * 处理树形结构
 * @param list 列表
 * @returns 树形结构
 */
export function handleTree(list) {
  const tree = []

  for (const item of list) {
    if (item.parentId === 0) {
      tree.push(item)
    }
    else {
      const parent = list.find(v => v.id === item.parentId)

      if (!parent.children)
        parent.children = []

      parent.children.push(item)
    }
  }

  return tree
}

/**
 * 从请求中获取IP
 * @param req
 */
export function getIpFromRequest(req: Request) {
  const ip = (req.headers['cf-connecting-ip']
    || req.headers['x-real-ip']
    || req.headers['x-forwarded-for']
    || '')[0] || req.ip || req.socket.remoteAddress

  return ip.trim()
}
