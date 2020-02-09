import { Injectable } from '@angular/core'
import { BeagleAngularConfig, BeagleAngularUIService } from './types'
import createCoreBeagleUIService from '../core'
import { DefaultSchema } from '../core/types'

@Injectable({
  providedIn: 'root',
})
export class BeagleProvider {
  private service: BeagleAngularUIService | undefined

  start<Schema = DefaultSchema>(config: BeagleAngularConfig<Schema>) {
    if (this.service) {
      console.error('Beagle service has already started!')
      return
    }
    this.service = createCoreBeagleUIService(config)
  }

  getBeagleUIService() {
    return this.service
  }
}
