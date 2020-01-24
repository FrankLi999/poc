import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";


@Component({
  selector: 'formio-basic-checkbox',
  templateUrl: './formio-basic-checkbox.component.html'
})
export class FormioBasicCheckboxComponent extends FormioBasicFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }
}
