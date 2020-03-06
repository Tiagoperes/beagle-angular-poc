import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.beagle.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'beagle-angular'
  loadParams = {
    path: 'd803e59aadc5c3cc8def28553f17d61f/raw/ab4d4ffde525e4e46cc72a766af84c5708847db0/beagle-example.json',
  }
}
