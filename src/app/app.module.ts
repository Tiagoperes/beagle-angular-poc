import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { InlineSVGModule } from 'ng-inline-svg'
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
import { ServerDrivenUI } from './sduiLib/angular'
import { BeagleAnchor } from './sduiLib/angular/directive'
import { ImageComponent } from './components/image/image.component'
import sdui from './sdui.config'

ServerDrivenUI.sdui = sdui

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CardComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
    TitleComponent,
    TextComponent,
    ServerDrivenUI,
    BeagleAnchor,
    ContainerComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  entryComponents: [
    CardComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
    TitleComponent,
    TextComponent,
    ContainerComponent,
    ImageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
