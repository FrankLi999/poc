import { Component, OnInit } from '@angular/core';

import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-material-radio-group',
  templateUrl: './formio-material-radio-group.component.html'
})
export class FormioMaterialRadioGroupComponent extends FormioMaterialFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
