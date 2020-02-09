import { UIElement } from '../core/types'
import { Config } from '../core/types'
import { AngularRenderOptions } from './types'

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
    return ''
  }

  const factory = resolver.resolveComponentFactory<any>(componentDefinition)
  if (!children) return createTagTemplate(factory.selector, props)

  const childrenTemplates = children.map(child => createAngularComponentTree(config, child, { resolver }))

  return createTagTemplate(factory.selector, props, childrenTemplates.join(''))
}

export default createAngularComponentTree
