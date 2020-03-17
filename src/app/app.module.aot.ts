import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { InlineSVGModule } from 'ng-inline-svg'
import { BeagleComponentsModule } from './beagle-components.module'
import { Beagle } from './beagle.module'

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
    Beagle,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
