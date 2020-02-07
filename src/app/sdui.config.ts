import { createServerDrivenUI } from './sduiLib/angular'
import Schema from './schema'
import { CardComponent } from './components/card/card.component'
import { FormComponent } from './components/form/form.component'
import { InputComponent } from './components/input/input.component'
import { ButtonComponent } from './components/button/button.component'
import { TitleComponent } from './components/title/title.component'
import { TextComponent } from './components/text/text.component'
import { ContainerComponent } from './components/container/container.component'
import { ImageComponent } from './components/image/image.component'

export default createServerDrivenUI<Schema>({
  baseUrl: 'https://gist.githubusercontent.com/Tiagoperes',
  schemaUrl: 'https://gist.githubusercontent.com/Tiagoperes/df605a1656f27f7c2685a3c55979029b/raw/b438cd2831b0032de37fe9a1b2c320f30a3d3c4f/beagle-schema.ts',
  renderError: () => {},
  renderLoading: () => {},
  components: {
    button: ButtonComponent,
    container: ContainerComponent,
    form: FormComponent,
    image: ImageComponent,
    input: InputComponent,
    text: TextComponent,
    title: TitleComponent,
    card: CardComponent,
  }
})
