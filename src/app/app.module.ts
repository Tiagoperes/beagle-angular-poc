import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { InlineSVGModule } from 'ng-inline-svg'
import { ServerDrivenUI } from './sduiLib/angular'
import { BeagleAnchor } from './sduiLib/angular/directive'
import { BeagleModule } from './beagle.module'
import sdui from './sdui.config'

ServerDrivenUI.sdui = sdui

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ServerDrivenUI,
    BeagleAnchor,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    MatButtonModule,
    BeagleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
