import { UIElement } from '../core/types'
import { Config } from '../core/types'
import { AngularRenderOptions } from './types'


const createAngularComponentTree = <Schema>(
  config: Config<Schema>,
  ui: UIElement<Schema>,
  { injector, resolver }: AngularRenderOptions,
) => {
  console.log('rendering', ui)
  const { type, children, ...props } = ui
  const componentDefinition = config.components[type]

  if (!componentDefinition) {
    console.error(`Error: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
    return
  }

  const factory = resolver.resolveComponentFactory<any>(componentDefinition)
  const component = factory.create(injector)
  const propKeys = Object.keys(props)
  propKeys.forEach(propName => component.instance[propName] = props[propName])
  component.instance.beagleUiTree = ui

  if (!children) return

  children.forEach(
    child => createAngularComponentTree(
      config,
      child,
      { injector: component.injector, resolver },
    )
  )
}

export default createAngularComponentTree
