import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-calendar',
  templateUrl: './formio-primeng-calendar.component.html'
})
export class FormioPrimengCalendarComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) {
    super(validationService);
  }

}
