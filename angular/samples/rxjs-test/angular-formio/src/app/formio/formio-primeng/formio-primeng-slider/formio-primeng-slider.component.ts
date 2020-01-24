import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-slider',
  templateUrl: './formio-primeng-slider.component.html'
})
export class FormioPrimengSliderComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) { 
    super(validationService);
  }
}
