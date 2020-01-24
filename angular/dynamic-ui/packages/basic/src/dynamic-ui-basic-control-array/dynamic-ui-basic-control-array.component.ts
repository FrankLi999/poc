import { Component, ChangeDetectorRef } from '@angular/core';

import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-basic-control-array',
  templateUrl: './dynamic-ui-basic-control-array.component.html'
})
export class DynamicUIBasicControlArrayComponent extends DynamicUIBasicFormControlComponent {
  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
