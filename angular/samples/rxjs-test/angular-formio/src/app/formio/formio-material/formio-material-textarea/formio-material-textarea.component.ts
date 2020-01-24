import { Component, OnInit } from '@angular/core';

import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";

@Component({
  selector: 'formio-material-textarea',
  templateUrl: './formio-material-textarea.component.html'
})
export class FormioMaterialTextareaComponent extends FormioMaterialFormControlComponent  {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
  }
}

