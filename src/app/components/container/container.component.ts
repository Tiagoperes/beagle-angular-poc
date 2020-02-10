import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  template: '<div [ngStyle]="style"><ng-content></ng-content></div>',
})
export class ContainerComponent {
  @Input() public style: Record<string, any> = {}

}
