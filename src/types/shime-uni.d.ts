declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  type Hooks = App.AppInstance & Page.PageInstance
  const component: DefineComponent
  export default component

  interface ComponentCustomOptions extends Hooks {
  }
}
