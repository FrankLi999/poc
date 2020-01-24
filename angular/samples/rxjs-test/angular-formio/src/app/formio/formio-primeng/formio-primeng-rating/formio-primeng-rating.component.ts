import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-rating',
  templateUrl: './formio-primeng-rating.component.html'
})
export class FormioPrimengRatingComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService:FormioNg2DynamicFormValidationService) { 
    super(validationService);
  }
}
