import { BrowserModule } from '@angular/platform-browser'
import { NgModule, NgModuleRef } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { InlineSVGModule } from 'ng-inline-svg'
import { BeagleModule, BeagleProvider } from 'beagle-angular'
import { beagleConfig } from './beagle.config'
import { BeagleComponentsModule } from './beagle-components.module'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    MatButtonModule,
    BeagleComponentsModule,
    BeagleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(beagleProvider: BeagleProvider, module: NgModuleRef<any>) {
    // @ts-ignore
    beagleProvider.start(beagleConfig, module)
  }
}
