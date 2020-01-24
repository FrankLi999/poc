import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";


@Component({
  selector: 'formio-fieldset-basic',
  templateUrl: './formio-basic-fieldset.component.html'
})
export class FormioBasicFieldsetComponent extends FormioBasicFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}