import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";


@Component({
  selector: 'formio-basic-select',
  templateUrl: './formio-basic-select.component.html'
})
export class FormioBasicSelectComponent extends FormioBasicFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
