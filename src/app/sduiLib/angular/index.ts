import createCoreServerDrivenUI from '../core'
import { DefaultSchema } from '../core/types'
import { ServerDrivenUI } from './component'
import createAngularComponentTree from './renderer'
import { Config } from './types'

function createServerDrivenUI<Schema = DefaultSchema>(config: Config<Schema>) {
  return createCoreServerDrivenUI({
    ...config,
    renderComponentTree: createAngularComponentTree,
  })
}

export {
  ServerDrivenUI,
  createAngularComponentTree,
  createServerDrivenUI,
}
