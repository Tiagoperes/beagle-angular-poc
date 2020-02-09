import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  ComponentRef,
  Compiler,
  Injector,
  NgModuleRef,
  NgModule,
  OnDestroy,
} from '@angular/core'
import { BeagleProvider } from './provider'
import { BeagleAnchor } from './directive'
import buildTemplateFromBeagleUITree from './templateBuilder'

function last(array: Array<any>) {
  return array[array.length - 1]
}

@Component({
  selector: 'beagle-remote-view',
  template: '<ng-template beagle-anchor></ng-template>',
})
export class BeagleRemoteView implements AfterViewInit, OnDestroy {
  @Input() public path: string = ''
  @ViewChild(BeagleAnchor, {static: true}) anchor?: BeagleAnchor

  private dynamicComponentRef?: ComponentRef<any>

  constructor(
    private beagleProvider: BeagleProvider,
    private compiler: Compiler,
    private injector: Injector,
    private staticModule: NgModuleRef<any>,
  ) {}

  async ngAfterViewInit() {
    const beagleService = this.beagleProvider.getBeagleUIService()

    if (!beagleService) {
      throw new Error('Beagle: you must start the Beagle Provider before rendering a remote view!')
    }
    
    const componentResolver = this.staticModule.componentFactoryResolver
    const uiTree = await beagleService.loadBeagleUITree({ path: this.path })
    const template = buildTemplateFromBeagleUITree(uiTree, beagleService, componentResolver)

    const DynamicComponent = Component({ template })(class {})
    const DynamicModule = NgModule({
      declarations: [DynamicComponent],
      imports: [beagleService.getConfig().module],
    })(class {})

    const factories = await this.compiler.compileModuleAndAllComponentsAsync(DynamicModule)
    const dynamicComponentFactory = last(factories.componentFactories)
    this.dynamicComponentRef = dynamicComponentFactory.create(
      this.injector,
      [],
      null,
      this.staticModule,
    )
  
    this.anchor!.viewContainerRef.insert(this.dynamicComponentRef!.hostView)
  }

  ngOnDestroy() {
    if (this.dynamicComponentRef) this.dynamicComponentRef.destroy()
  }
}
