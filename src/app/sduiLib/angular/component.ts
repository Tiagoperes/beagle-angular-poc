import { Component, Input, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Compiler, Injector, NgModuleRef, NgModule, OnDestroy } from '@angular/core'
import { BeagleAnchor } from './directive'
import { ServerDrivenUI as IServerDrivenUI } from './types'
import { BeagleModule } from '../../beagle.module'

@Component({
  selector: 'server-driven-ui',
  template: '<ng-template beagle-anchor></ng-template>',
})
export class ServerDrivenUI implements AfterViewInit, OnDestroy {
  static sdui: IServerDrivenUI
  @Input() public path: string
  @ViewChild(BeagleAnchor, {static: true}) anchor: BeagleAnchor
  private cmpRef: ComponentRef<any>

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>,
  ) {}

  async ngAfterViewInit() {
    const template = await ServerDrivenUI.sdui.createServerDrivenElement(
      { path: this.path },
      { resolver: this._m.componentFactoryResolver },
    )

    const tmpCmp = Component({ template: template })(class {})
    
    const tmpModule = NgModule({ declarations: [tmpCmp], imports: [BeagleModule] })(class {});

    const factories = await this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
    const f = factories.componentFactories[factories.componentFactories.length - 1]
    this.cmpRef = f.create(this._injector, [], null, this._m)
    this.anchor.viewContainerRef.insert(this.cmpRef.hostView)
  }

  ngOnDestroy() {
    if (this.cmpRef) this.cmpRef.destroy()
  }
}
