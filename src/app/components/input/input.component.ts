import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { FormControl, Validators, ValidatorFn } from '@angular/forms'

type Validation = 'required' | 'validateMajority' | 'email'

const ERROR_MESSAGES = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
  underAge: 'Deve ser maior ou igual a 18',
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements AfterViewInit {
  @Input() public name: string
  @Input() public value?: string
  @Input() public placeholder?: string
  @Input() public validations?: Array<Validation>

  @Output() public onChange = new EventEmitter()

  @ViewChild('input',{ static: false }) inputElement: ElementRef

  private validators: Array<ValidatorFn> = []

  private customValidations: Partial<Record<Validation, ValidatorFn>> = {
    validateMajority: ({ value }) => value < 18 ? { underAge: true } : null
  }

  formControl = new FormControl('')

  public validate() {
    this.formControl.markAsTouched()
    this.formControl.updateValueAndValidity()
    return !this.formControl.invalid
  }

  public reset() {
    this.formControl.reset()
  }

  public getErrorMessage() {
    const errorKey = Object.keys(this.formControl.errors)[0]
    return ERROR_MESSAGES[errorKey] || 'Erro'
  }

  getValidationFunctionFromValidationName = (validationName: string): ValidatorFn => {
    const validationFunction = this.customValidations[validationName] || Validators[validationName]
    if (validationFunction) return validationFunction
    console.error('Validation function not found:', validationName)
    return () => null
  }

  ngAfterViewInit() {
    this.validators = this.validations.map(this.getValidationFunctionFromValidationName)
    this.formControl.setValidators(this.validators)
    this.formControl.valueChanges.subscribe(value => {
      this.onChange.emit({ name: this.name, value })
    })
  }

}
