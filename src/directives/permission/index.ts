import type { Directive, DirectiveBinding } from 'vue'

import { useUserStore } from '@/store'

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「超级管理员」拥有所有的按钮权限
    const { userInfo } = useUserStore()
    const { roles, permissions } = userInfo

    if (roles.includes(1))
      return true

    // 「其他角色」按钮权限校验
    const { value } = binding
    if (value) {
      const requiredPerms = value // DOM绑定需要的按钮权限标识

      const hasPerm = permissions?.some((perm) => {
        return requiredPerms.includes(perm)
      })

      if (!hasPerm)
        el.parentNode && el.parentNode.removeChild(el)
    }
    else {
      throw new Error(
        '无权限访问',
      )
    }
  },
}

/**
 * 角色权限
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (value) {
      const requiredRoles = value // DOM绑定需要的角色编码
      const { userInfo } = useUserStore()
      const { roles } = userInfo
      const hasRole = roles.some((role) => {
        return requiredRoles.includes(role)
      })

      if (!hasRole)
        el.parentNode && el.parentNode.removeChild(el)
    }
    else {
      throw new Error('无角色访问权限')
    }
  },
}
