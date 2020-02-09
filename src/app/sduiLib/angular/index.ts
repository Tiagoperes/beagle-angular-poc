import createCoreBeagleUIService from '../core'
import { DefaultSchema } from '../core/types'
import { BeagleRemoteView } from './component'
import { BeagleAngularConfig } from './types'

function createBeagleUIService<Schema = DefaultSchema>(config: BeagleAngularConfig<Schema>) {
  return createCoreBeagleUIService(config)
}

export {
  BeagleRemoteView,
  createBeagleUIService,
}
