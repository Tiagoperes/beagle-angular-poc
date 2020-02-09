import { ComponentFactoryResolver } from '@angular/core'
import { BeagleUIService, BeagleUIElement } from '../core/types'

const buildTemplateFromBeagleUITree = <Schema>(
  beagleUITree: BeagleUIElement<Schema>,
  beagleUIService: BeagleUIService<Schema>,
  componentResolver: ComponentFactoryResolver,
) => (
  beagleUIService.convertBeagleUiTreeToXml(beagleUITree, {
    formatTagName: (componentName) => {
      const componentDefinition = beagleUIService.getConfig().components[componentName]
      const factory = componentResolver.resolveComponentFactory<any>(componentDefinition)
      return factory.selector
    },
    formatAttributeName: name => `[${name}]`,
  })
)

export default buildTemplateFromBeagleUITree
