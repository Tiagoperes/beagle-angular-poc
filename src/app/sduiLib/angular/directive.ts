import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[beagle-anchor]',
})
export class BeagleAnchor {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
