/* BEAGLE-ANGULAR
 *
 * Please, do not change this file.
 *
 * This file has been automatically generated by the lib beagle-angular. This is necessary when
 * the developer doesn't want to use the JIT angular compiler. With this, you should be able
 * to use the beagle-angular library without ever loading the JIT. The module created here
 * should be imported by the modules where you need to use the component "beagle-remote-view".
 *
 * This file should be regenerated every time a component in your beagle configuration is added,
 * removed or its inputs are changed. To regenerate it, run:
 * yarn beagle-build-aot
 **/

import {
  Component,
  NgModule,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
  Injectable,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractBeagleRemoteView, AbstractBeagleProvider } from 'beagle-angular'
import { config } from './beagle.config'
import { BeagleComponentsModule } from './beagle-components.module'

const template = `
  <ng-template #appButton let-action="action" let-title="title" let-primary="primary" let-children="children">
    <app-button [action]="action" [title]="title" [primary]="primary">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-button>
  </ng-template>

  <ng-template #appContainer let-style="style" let-children="children">
    <app-container [style]="style">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-container>
  </ng-template>

  <ng-template #appForm let-url="url" let-method="method" let-successMessage="successMessage" let-errorMessage="errorMessage" let-style="style" let-children="children">
    <app-form [url]="url" [method]="method" [successMessage]="successMessage" [errorMessage]="errorMessage" [style]="style">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-form>
  </ng-template>

  <ng-template #appImage let-style="style" let-url="url" let-description="description" let-children="children">
    <app-image [style]="style" [url]="url" [description]="description">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-image>
  </ng-template>

  <ng-template #appInput let-name="name" let-value="value" let-placeholder="placeholder" let-validations="validations" let-type="type" let-children="children">
    <app-input [name]="name" [value]="value" [placeholder]="placeholder" [validations]="validations" [type]="type">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-input>
  </ng-template>

  <ng-template #appText let-value="value" let-children="children">
    <app-text [value]="value">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-text>
  </ng-template>

  <ng-template #appTitle let-value="value" let-children="children">
    <app-title [value]="value">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-title>
  </ng-template>

  <ng-template #appCard let-style="style" let-children="children">
    <app-card [style]="style">
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-card>
  </ng-template>

  <ng-template #appError  let-children="children">
    <app-error >
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-error>
  </ng-template>

  <ng-template #appLoading  let-children="children">
    <app-loading >
      <ng-container *ngFor="let child of children">
        <ng-container *ngTemplateOutlet="getTemplate(child.type);context:child"></ng-container>
      </ng-container>
    </app-loading>
  </ng-template>
  <ng-container #__view_container>
    <ng-container *ngIf="!!tree">
      <ng-container *ngTemplateOutlet="getTemplate(tree.type);context:tree">
      </ng-container>
    </ng-container>
  </ng-container>
`

@Component({
  selector: 'beagle-remote-view',
  template,
  inputs: ['loadParams'],
  queries: {
    button: new ViewChild('appButton', { static: true }),
    container: new ViewChild('appContainer', { static: true }),
    form: new ViewChild('appForm', { static: true }),
    image: new ViewChild('appImage', { static: true }),
    input: new ViewChild('appInput', { static: true }),
    text: new ViewChild('appText', { static: true }),
    title: new ViewChild('appTitle', { static: true }),
    card: new ViewChild('appCard', { static: true }),
    error: new ViewChild('appError', { static: true }),
    loading: new ViewChild('appLoading', { static: true }),
  },
})
export class BeagleRemoteView extends AbstractBeagleRemoteView {
  constructor(
    beagleProvider: BeagleProvider,
    ngZone: NgZone,
    changeDetector: ChangeDetectorRef,
  ) {
    // @ts-ignore
    super(beagleProvider, ngZone, changeDetector)
  }
}

@Injectable()
export class BeagleProvider extends AbstractBeagleProvider {}

@NgModule({
  declarations: [BeagleRemoteView],
  exports: [BeagleRemoteView],
  imports: [CommonModule, BeagleComponentsModule],
  providers: [BeagleProvider],
})
export class BeagleModule {
  constructor(provider: BeagleProvider) {
    provider.start(config)
  }
}
