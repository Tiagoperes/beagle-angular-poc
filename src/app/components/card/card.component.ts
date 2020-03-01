import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements AfterViewInit {
  @Input() public style?: Record<string, any>

  ngAfterViewInit() {
    console.log('INSIDE CARD VIEW INIT', this.style)
  }
}
