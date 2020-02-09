import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
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

export const components = [
  CardComponent,
  FormComponent,
  InputComponent,
  ButtonComponent,
  TitleComponent,
  TextComponent,
  ContainerComponent,
  ImageComponent,
  ErrorComponent,
  LoadingComponent,
]

@NgModule({
  declarations: components,
  entryComponents: components,
  exports: components,
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class BeagleModule { }
