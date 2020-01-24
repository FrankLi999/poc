import { Component, ChangeDetectorRef } from '@angular/core';

import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-basic-radio-group',
  templateUrl: './dynamic-ui-basic-radio-group.component.html'
})
export class DynamicUIBasicRadioGroupComponent extends DynamicUIBasicFormControlComponent  {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
