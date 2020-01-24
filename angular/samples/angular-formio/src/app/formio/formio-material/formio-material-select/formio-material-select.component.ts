import { Component, OnInit } from '@angular/core';

import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-material-select',
  templateUrl: './formio-material-select.component.html'
})
export class FormioMaterialSelectComponent extends FormioMaterialFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}
