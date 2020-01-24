import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-radio-group',
  templateUrl: './formio-primeng-radio-group.component.html',
})
export class FormioPrimengRadioGroupComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }

}

