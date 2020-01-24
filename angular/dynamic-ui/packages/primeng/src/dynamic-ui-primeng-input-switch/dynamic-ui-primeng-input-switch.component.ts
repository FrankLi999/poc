import { Component, ChangeDetectorRef } from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";
@Component({
  selector: 'dynamic-ui-primeng-input-switch',
  templateUrl: './dynamic-ui-primeng-input-switch.component.html'
})
export class DynamicUIPrimengInputSwitchComponent extends DynamicUIPrimengFormControlComponent {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}

