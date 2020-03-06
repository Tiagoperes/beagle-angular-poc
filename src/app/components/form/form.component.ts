import { Component, AfterViewInit, Input, ContentChildren, QueryList } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BeagleComponent } from 'beagle-angular'
import { NetworkService, HttpMethod } from '../../services/network.service'
import { InputComponent } from '../input/input.component'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent extends BeagleComponent implements AfterViewInit {
  @Input() public url: string
  @Input() public method: HttpMethod = 'get'
  @Input() public successMessage?: string
  @Input() public errorMessage?: string
  @Input() public style?: Record<string, string>

  @ContentChildren(InputComponent, { descendants: true })
  inputs: QueryList<InputComponent>

  model = {}
  isLoading = false

  constructor(private network: NetworkService, private snackBar: MatSnackBar) {
    super()
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

  appendText() {
    this.getBeagleContext().append({ path: 'd803e59aadc5c3cc8def28553f17d61f/raw/ab4d4ffde525e4e46cc72a766af84c5708847db0/beagle-example-2.json' })
  }

}
