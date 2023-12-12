import { hasPerm, hasRole } from './permission'

import type { App } from 'vue'

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  app.directive('perm', hasPerm)
  app.directive('role', hasRole)
}
