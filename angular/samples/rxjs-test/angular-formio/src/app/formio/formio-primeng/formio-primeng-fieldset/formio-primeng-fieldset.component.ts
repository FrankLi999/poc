import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-fieldset',
  templateUrl: './formio-primeng-fieldset.component.html'
})
export class FormioPrimengFieldsetComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }
}

