import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType
} from 'vue'
// 开头必须要有 导入文件 否则 ts会认为是 类型覆盖 加了 就成node 全局下 类型补充

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }
  // 定义全局的type

  declare type Recordable<T = any> = Record<string, T>

  declare type Nullable<T> = T | null
}
