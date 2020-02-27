import { imports, BeagleComponentsModule } from './beagle-components.module'
import { CardComponent } from './components/card/card.component'
import { FormComponent } from './components/form/form.component'
import { InputComponent } from './components/input/input.component'
import { ButtonComponent } from './components/button/button.component'
import { TitleComponent } from './components/title/title.component'
import { TextComponent } from './components/text/text.component'
import { ContainerComponent } from './components/container/container.component'
import { ImageComponent } from './components/image/image.component'
import { ErrorComponent } from './components/error/error.component'
import { LoadingComponent } from './components/loading/loading.component'
import Schema from './schema'
import { BeagleAngularConfig } from 'beagle-angular'

function logger(uiTree) {
  console.log(uiTree)
  return uiTree
}

export const beagleConfig: BeagleAngularConfig<Schema> = {
  baseUrl: 'https://gist.githubusercontent.com/Tiagoperes',
  schemaUrl: 'https://gist.githubusercontent.com/Tiagoperes/df605a1656f27f7c2685a3c55979029b/raw/b438cd2831b0032de37fe9a1b2c320f30a3d3c4f/beagle-schema.ts',
  imports,
  middlewares: [logger],
  components: {
    button: ButtonComponent,
    container: ContainerComponent,
    form: FormComponent,
    image: ImageComponent,
    input: InputComponent,
    text: TextComponent,
    title: TitleComponent,
    card: CardComponent,
    error: ErrorComponent,
    loading: LoadingComponent,
  },
}
