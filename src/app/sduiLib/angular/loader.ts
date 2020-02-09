import { Component, Input, ViewChild, AfterViewInit, ComponentFactoryResolver, Type } from '@angular/core'
import { BeagleAnchor } from './directive'

@Component({
  selector: 'sdui-component-loader',
  template: '<ng-template beagle-anchor></ng-template>',
})
export class ComponentLoader implements AfterViewInit {
  @Input() public type: Type<any>
  @Input() public props: Record<string, any>
  @ViewChild(BeagleAnchor, {static: true}) anchor: BeagleAnchor

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentFactoryResolver = componentFactoryResolver
  }

  ngAfterViewInit() {
    const viewContainerRef = this.anchor.viewContainerRef
    const componentDefinition = this.componentFactoryResolver.resolveComponentFactory(this.type)
    viewContainerRef.clear()
    const component = viewContainerRef.createComponent(componentDefinition)
    const propNames = Object.keys(this.props)
    propNames.forEach(name => component.instance[name] = this.props[name])
  }
}
