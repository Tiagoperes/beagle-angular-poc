import { NgModule } from '@angular/core'
import { BeagleRemoteView } from './component'
import { BeagleAnchor } from './directive'
import { BeagleProvider } from './provider'
import { BeagleAngularConfig, BeagleAngularUIService } from './types'

@NgModule({
  declarations: [
    BeagleRemoteView,
    BeagleAnchor,
  ],
  providers: [
    BeagleProvider,
  ],
  exports: [
    BeagleRemoteView,
  ],
})
class BeagleModule { }

export {
  BeagleModule,
  BeagleProvider,
  BeagleAngularConfig,
  BeagleAngularUIService,
}
