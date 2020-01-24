import { Component, OnInit } from '@angular/core';

import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-material-control-array',
  templateUrl: './formio-material-control-array.component.html'
})
export class FormioMaterialControlArrayComponent extends FormioMaterialFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
