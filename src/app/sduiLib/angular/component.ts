import { Component, Input, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core'
import { BeagleAnchor } from './directive'
import { ServerDrivenUI as IServerDrivenUI } from './types'

@Component({
  selector: 'server-driven-ui',
  template: '<ng-template beagle-anchor></ng-template>',
})
export class ServerDrivenUI implements AfterViewInit {
  static sdui: IServerDrivenUI
  @Input() public path: string
  @ViewChild(BeagleAnchor, {static: true}) anchor: BeagleAnchor

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentFactoryResolver = componentFactoryResolver
  }

  ngAfterViewInit() {
    this.loadComponent()
  }

  loadComponent() {
    const viewContainerRef: ViewContainerRef = this.anchor.viewContainerRef
    viewContainerRef.clear()

    ServerDrivenUI.sdui.createServerDrivenElement({ path: this.path }, {
      injector: viewContainerRef.injector,
      resolver: this.componentFactoryResolver,
    })
  }
}
