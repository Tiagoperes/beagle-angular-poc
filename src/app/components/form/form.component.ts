import { Component, AfterViewInit, Input, ContentChildren, QueryList, ChangeDetectorRef, NgModuleRef, DoCheck, OnInit } from '@angular/core'
import { NetworkService, HttpMethod } from '../../services/network.service'
import { InputComponent } from '../input/input.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements AfterViewInit, DoCheck, OnInit {
  @Input() public url: string
  @Input() public method: HttpMethod = 'get'
  @Input() public successMessage?: string
  @Input() public errorMessage?: string
  @Input() public style?: Record<string, string>

  @ContentChildren(InputComponent, { descendants: true })
  inputs: QueryList<InputComponent>

  model = {}
  isLoading = false

  constructor(private network: NetworkService, private snackBar: MatSnackBar, private changeDetector: ChangeDetectorRef, private module: NgModuleRef<any>) {
    this.network = network
    this.snackBar = snackBar
  }

  private isValid() {
    console.log('=>', this.inputs)
    return this.inputs.reduce((result, input) => input.validate() && result, true)
  }

  ngAfterViewInit() {
    console.log('INSIDE FORM AFTER VIEW INIT', this)
    // this.inputs.changes.subscribe((...args) => console.log('QUERY RESULT CHANGED', ...args))
    // this.inputs.setDirty()
    // this.changeDetector.detectChanges()
    // setTimeout(() => console.log(this.inputs), 100)
    // console.log('=>', this.url, this.method)
    // setTimeout(() => {
    //   console.log('running change detection')
    //   this.changeDetector.detectChanges()
    //   console.log(this.module.componentFactoryResolver.resolveComponentFactory(InputComponent))
    //   console.log(this.inputs)
    //   console.log(this)
    //   console.log(FormComponent)
    // }, 6000)
    this.inputs.changes.subscribe((...args) => console.log('QUERY RESULT CHANGED', ...args))
    this.inputs.forEach(input => {
      input.onChange.subscribe(({ name, value }) => this.model[name] = value)
    })
  }

  async onSubmit() {
    if (!this.isValid() || !this.url) return
    this.isLoading = true
    try {
      await this.network.sendRequest({ url: this.url, method: this.method, data: this.model })
      if (this.successMessage) this.snackBar.open(this.successMessage)
    } catch (errorMessage) {
      console.error(errorMessage)
      if (this.errorMessage) this.snackBar.open(this.errorMessage)
    } finally {
      this.isLoading = false
    }
  }

  onReset() {
    this.inputs.forEach(input => input.reset())
  }

  ngDoCheck() {
    console.log('doing check')
  }

  ngOnInit() {
    setTimeout(() => {console.log('timer ran doCheck()');this.ngDoCheck()}, 0);
  }

}
