declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}
