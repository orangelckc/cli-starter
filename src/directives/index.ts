import { type App } from 'vue'

import { hasPerm, hasRole } from './permission'

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  app.directive('perm', hasPerm)
  app.directive('role', hasRole)
}
