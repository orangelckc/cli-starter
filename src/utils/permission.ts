import { useUserStore } from '@/store'

/** 全局权限判断函数，和指令 v-permission 功能类似 */
export function checkPermission(value: number[]): boolean {
  const { userInfo } = useUserStore()

  if (value && Array.isArray(value) && value.length > 0) {
    const roles = userInfo.roles
    const permissionRoles = value

    return roles.some((role) => {
      return permissionRoles.includes(role)
    })
  }
  else {
    return false
  }
}
