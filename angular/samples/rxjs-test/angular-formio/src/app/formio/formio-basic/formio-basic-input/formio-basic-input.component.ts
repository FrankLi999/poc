import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";


@Component({
  selector: 'formio-basic-input',
  templateUrl: './formio-basic-input.component.html'
})
export class FormioBasicInputComponent extends FormioBasicFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
