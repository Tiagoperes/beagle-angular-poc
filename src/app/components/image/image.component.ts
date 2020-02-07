import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  template: '<img src={{url}} alt={{description}} [ngStyle]="style" />',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent {
  @Input() public style?: Record<string, any>
  @Input() public url: string
  @Input() public description?: string
}
