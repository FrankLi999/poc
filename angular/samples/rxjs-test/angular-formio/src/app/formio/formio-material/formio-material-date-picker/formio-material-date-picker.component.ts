import { Component, OnInit } from '@angular/core';

import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-material-date-picker',
  templateUrl: './formio-material-date-picker.component.html'
})
export class FormioMaterialDatePickerComponent extends FormioMaterialFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
