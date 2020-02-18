import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.beagle.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'beagle-angular'
  loadParams = {
    path: 'd803e59aadc5c3cc8def28553f17d61f/raw/b7918f950ae6a0fb763f34f5637c76f8309fac7a/beagle-example.json',
  }
}
