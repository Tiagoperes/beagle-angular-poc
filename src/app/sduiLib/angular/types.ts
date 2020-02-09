import { Type, ModuleWithProviders } from '@angular/core'
import { BeagleConfig, BeagleUIService, DefaultSchema } from '../core/types'

export interface BeagleAngularConfig<Schema> extends BeagleConfig<Schema> {
  components: { error: Type<{}>, loading: Type<{}> } & {
    [K in keyof Schema]: Type<Schema[K]>
  },
  module: Type<any> | ModuleWithProviders<{}> | any[],
}

export interface BeagleAngularUIService<Schema = DefaultSchema> extends BeagleUIService<Schema> {
  getConfig: () => BeagleAngularConfig<Schema>
}
