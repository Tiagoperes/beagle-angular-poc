import { ComponentFactoryResolver, Injector, Type } from '@angular/core'
import {
  Config as CoreConfig,
  ServerDrivenUI as CoreServerDrivenUI,
  LoadParams,
} from '../core/types'

export interface Config<Schema = any> extends Omit<CoreConfig<Schema>, 'renderComponentTree'> {
  components: {
    [K in keyof Schema]: Type<Schema[K]>
  },
}

export interface AngularRenderOptions {
  injector: Injector,
  resolver: ComponentFactoryResolver,
}

export interface ServerDrivenUI extends CoreServerDrivenUI {
  createServerDrivenElement: (loadParams: LoadParams, options: AngularRenderOptions) => any,
}
