import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { BeagleModule, BeagleProvider } from 'beagle-angular'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { InlineSVGModule } from 'ng-inline-svg'
import { BeagleComponentsModule } from './beagle-components.module'
import { config as beagleConfig } from './beagle.config'

// @NgModule({
//   declarations: [
//     AppComponent,
//     NavBarComponent,
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     InlineSVGModule.forRoot(),
//     MatButtonModule,
//     BeagleComponentsModule,
//     BeagleModule.forRoot(),
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {
//   constructor(beagleProvider: BeagleProvider) {
//     beagleProvider.start(beagleConfig)
//   }
// }
