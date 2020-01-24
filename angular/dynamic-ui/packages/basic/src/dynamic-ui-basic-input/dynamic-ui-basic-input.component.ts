import { Component, ChangeDetectorRef } from '@angular/core';

import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-basic-input',
  templateUrl: './dynamic-ui-basic-input.component.html'
})
export class DynamicUIBasicInputComponent extends DynamicUIBasicFormControlComponent  {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
