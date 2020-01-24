import { Component } from '@angular/core';

import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";


@Component({
  selector: 'formio-basic-radio-group',
  templateUrl: './formio-basic-radio-group.component.html'
})
export class FormioBasicRadioGroupComponent extends FormioBasicFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
