import { Type, ComponentFactoryResolver, ComponentRef } from '@angular/core'
import { UIElement } from '../core/types'
import { Config } from '../core/types'
import { AngularRenderOptions } from './types'

// function getNodesFromBeagleUiTree<Schema>(
//   element: UIElement<Schema>,
//   components: Record<keyof Schema, Type<any>>,
//   resolver: ComponentFactoryResolver,
// ) {
//   const { type, children}
//   const componentDefinition: Type<any> = components[element.type]
//   const factory = resolver.resolveComponentFactory<any>(componentDefinition)
//   const node = document.createElement(factory.selector)
//   node.attributes =
// }

// const createAngularComponentTree = <Schema>(
//   config: Config<Schema>,
//   ui: UIElement<Schema>,
//   { anchor, resolver }: AngularRenderOptions,
// ) => {
//   const { type, children, ...props } = ui
//   const componentDefinition = config.components[type]

//   if (!componentDefinition) {
//     console.error(`Error: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
//     return
//   }

//   const factory = resolver.resolveComponentFactory<any>(componentDefinition)
//   const component = anchor.createComponent(factory)
//   const propKeys = Object.keys(props)
//   propKeys.forEach(propName => component.instance[propName] = props[propName])
//   component.instance.beagleUiTree = ui

//   if (!children) return

//   console.log('=> component', component)

//   children.forEach(
//     child => createAngularComponentTree(
//       config,
//       child,
//       { anchor: component.hostView._viewContainerRef, resolver },
//     )
//   )
// }

// const createAngularComponentTree = <Schema>(
//   config: Config<Schema>,
//   ui: UIElement<Schema>,
//   { injector, resolver }: AngularRenderOptions,
// ) => {
//   const { type, children, ...props } = ui
//   const componentDefinition = config.components[type]

//   if (!componentDefinition) {
//     console.error(`Error: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
//     return
//   }

//   const factory = resolver.resolveComponentFactory<any>(componentDefinition)
//   const component = factory.create(injector)
//   const propKeys = Object.keys(props)
//   propKeys.forEach(propName => component.instance[propName] = props[propName])
//   component.instance.beagleUiTree = ui

//   if (!children) return [component]

//   const childrenComponents = children.map(
//     child => createAngularComponentTree(
//       config,
//       child,
//       { injector: component.injector, resolver },
//     )
//   )

//   return [component, ...childrenComponents.flat()]
// }

const formatAsAngularValue = (value: any) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return `'${value}'`
  if (typeof value !== 'object') return JSON.stringify(value)
  if (value instanceof Array) return `[${value.map(formatAsAngularValue)}]`
  const keys = Object.keys(value)
  const keyValuePairs = keys.map(key => `${key}:${formatAsAngularValue(value[key])}`)
  return `{${keyValuePairs.join(',')}}`
}

const createTagTemplate = (selector: string, props: Record<string, any>, children = '') => {
  const propNames = Object.keys(props)
  const attrs = propNames.map(name => `[${name}]="${formatAsAngularValue(props[name])}"`)
  return `<${selector} ${attrs.join(' ')}>${children}</${selector}>`
}

const createAngularComponentTree = <Schema>(
  config: Config<Schema>,
  ui: UIElement<Schema>,
  { resolver }: AngularRenderOptions,
) => {
  const { type, children, ...props } = ui
  const componentDefinition = config.components[type]

  if (!componentDefinition) {
    console.error(`Error: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
    return
  }

  const factory = resolver.resolveComponentFactory<any>(componentDefinition)
  if (!children) return createTagTemplate(factory.selector, props)

  const childrenTemplates = children.map(child => createAngularComponentTree(config, child, { resolver }))

  return createTagTemplate(factory.selector, props, childrenTemplates.join(''))
}

export default createAngularComponentTree
