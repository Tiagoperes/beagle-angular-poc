import {
  Component,
  AfterViewInit,
  Input,
  ContentChildren,
  QueryList,
  ViewContainerRef,
} from '@angular/core'
import { NetworkService, HttpMethod } from '../../services/network.service'
import { InputComponent } from '../input/input.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { getContext } from 'beagle-angular'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements AfterViewInit {
  @Input() public url: string
  @Input() public method: HttpMethod = 'get'
  @Input() public successMessage?: string
  @Input() public errorMessage?: string
  @Input() public style?: Record<string, string>

  @ContentChildren(InputComponent, { descendants: true })
  inputs: QueryList<InputComponent>

  model = {}
  isLoading = false

  constructor(
    private network: NetworkService,
    private snackBar: MatSnackBar,
    private viewRef: ViewContainerRef,
  ) {
    this.network = network
    this.snackBar = snackBar
  }

  private isValid() {
    return this.inputs.reduce((result, input) => input.validate() && result, true)
  }

  ngAfterViewInit() {
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

  testAppend() {
    const beagleContext = getContext(this.viewRef)
    beagleContext.append({ path: 'd803e59aadc5c3cc8def28553f17d61f/raw/e11b04a51c79499d52c4604a9524640585d1caed/beagle-example-2.json' })
  }

}
