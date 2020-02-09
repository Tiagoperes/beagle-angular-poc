export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

type ComponentName<Schema> = keyof Schema | 'error' | 'loading'

export interface BeagleConfig<Schema> {
  baseUrl: string,
  schemaUrl?: string,
  headers?: Record<string, string>,
  components: {
    [K in ComponentName<Schema>]: any
  },
}

export interface LoadParams {
  path: string,
  baseUrl?: string,
  method?: HttpMethod,
  headers?: Record<string, string>,
}

export interface BeagleUIElement<Schema> {
  type: ComponentName<Schema>,
  children?: Array<BeagleUIElement<Schema>>,
  key?: string,
  [key: string]: any,
}

export interface XmlOptions<Schema> {
  formatTagName: (componentName: ComponentName<Schema>) => string,
  formatAttributeName: (name: string) => string,
  formatAttributeValue: (value: any) => string,
}

export interface BeagleUIService<Schema = DefaultSchema, ConfigType = BeagleConfig<Schema>> {
  loadBeagleUITree: (loadParams: LoadParams) => Promise<BeagleUIElement<Schema>>,
  convertBeagleUiTreeToXml: (
    uiTree: BeagleUIElement<Schema>,
    options?: Partial<XmlOptions<Schema>>,
  ) => string,
  getConfig: () => ConfigType,
}

export type DefaultSchema = Record<string, Record<string, any>>
