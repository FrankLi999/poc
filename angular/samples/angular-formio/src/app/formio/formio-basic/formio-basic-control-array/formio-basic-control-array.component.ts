import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-basic-control-array',
  templateUrl: './formio-basic-control-array.component.html'
})
export class FormioBasicControlArrayComponent extends FormioBasicFormControlComponent {
  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }
}
