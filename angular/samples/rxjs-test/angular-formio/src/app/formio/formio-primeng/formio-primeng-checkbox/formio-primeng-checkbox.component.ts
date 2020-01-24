import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-checkbox-primeng',
  templateUrl: './formio-primeng-checkbox.component.html'
})
export class FormioPrimengCheckboxComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }

}
