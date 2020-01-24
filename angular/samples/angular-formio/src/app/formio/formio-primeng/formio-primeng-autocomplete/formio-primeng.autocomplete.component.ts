import { Component } from '@angular/core';
import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  FormioNg2DynamicFormValidationService
} from "../../formio-core";
@Component({
  selector: 'formio-primeng-autocomplete',
  templateUrl: './formio-primeng.autocomplete.component.html',
})
export class FormioPrimengAutocompleteComponent extends FormioPrimengFormControlComponent {

  constructor(protected validationService: FormioNg2DynamicFormValidationService) { 
    super(validationService);
  }

}
