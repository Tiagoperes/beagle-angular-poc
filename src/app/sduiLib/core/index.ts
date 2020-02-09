import {
  DefaultSchema,
  BeagleConfig,
  LoadParams,
  BeagleUIElement,
  BeagleUIService,
  XmlOptions,
} from './types'

const namespace = '@beagle-web/cache'

const formatXmlValue = (value: any) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return `'${value}'`
  if (typeof value !== 'object') return JSON.stringify(value)
  if (value instanceof Array) return `[${value.map(formatXmlValue)}]`
  const keys = Object.keys(value)
  const keyValuePairs = keys.map(key => `${key}:${formatXmlValue(value[key])}`)
  return `{${keyValuePairs.join(',')}}`
}

function createBeagleUIService<
  Schema = DefaultSchema,
  ConfigType extends BeagleConfig<Schema> = BeagleConfig<Schema>
>(config: ConfigType): BeagleUIService<Schema, ConfigType> {
  const loadFromCache = async ({ path, baseUrl, method = 'get' }: LoadParams) => {
    const url = `${baseUrl || config.baseUrl}/${path}`
    const fromStorage = localStorage.getItem(`${namespace}/${url}/${method}`)
    return fromStorage ? JSON.parse(fromStorage) : null
  }

  const loadFromServer = async ({ path, baseUrl, method = 'get', headers }: LoadParams) => {
    const url = `${baseUrl || config.baseUrl}/${path}`
    const response = await fetch(url, { method, headers: { ...config.headers, ...headers } })
    if (response.status < 100 && response.status >= 400) throw new Error('Network error')
    const uiTree = await response.json() as BeagleUIElement<Schema>
    localStorage.setItem(`${namespace}/${url}/${method}`, JSON.stringify(uiTree))
    return uiTree
  }

  const loadBeagleUITree = async (loadParams: LoadParams): Promise<BeagleUIElement<Schema>> => {
    let uiTree: BeagleUIElement<Schema>
    try {
      uiTree = await loadFromServer(loadParams)
    } catch (error) {
      console.error('Error while fetching server driven component:', error)
      uiTree = await loadFromCache(loadParams)
    }
    return uiTree || { type: 'error' }
  }

  const defaultXmlOptions: XmlOptions<Schema> = {
    formatTagName: name => name as string,
    formatAttributeName: name => name,
    formatAttributeValue: value => `"${formatXmlValue(value)}"`,
  }

  const convertBeagleUiTreeToXml = (
    uiTree: BeagleUIElement<Schema>,
    options?: Partial<XmlOptions<Schema>>,
  ): string => {
    const { type, children, ...props } = uiTree

    if (!config.components[type]) {
      console.error(`Error: server driven UI could not find component ${type}. This component and its children won't be rendered.`)
      return ''
    }

    const opts = { ...defaultXmlOptions, ...options }
    const tagName = opts.formatTagName(type)
    const propNames = Object.keys(props)
    const attrs = propNames.map(
      name => `${opts.formatAttributeName(name)}=${opts.formatAttributeValue(props[name])}`
    )
    const childrenXmlList = children
      ? children.map(child => convertBeagleUiTreeToXml(child, options))
      : []

    return `<${tagName} ${attrs.join(' ')}>${childrenXmlList.join('')}</${tagName}>`
  }

  return {
    loadBeagleUITree,
    convertBeagleUiTreeToXml,
    getConfig: () => config,
  }
}

export default createBeagleUIService
