/** 动态路由配置 */
// @unocss-include
export enum IconClass {
  system = 'i-ep-setting',
  admin = 'i-ep-user-filled',
  role = 'i-ep-gold-medal',
  menu = 'i-ep-menu',
  dept = 'i-ep-office-building',
  list = 'i-ep-list',
}

export type Icons = keyof typeof IconClass

export function getIcon(key?: string) {
  return !key ? '' : IconClass[key as Icons]
}
