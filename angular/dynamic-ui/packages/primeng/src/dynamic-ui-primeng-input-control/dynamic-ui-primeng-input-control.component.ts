import { Component, ChangeDetectorRef } from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";
@Component({
  selector: 'dynamic-ui-primeng-input-control',
  templateUrl: './dynamic-ui-primeng-input-control.component.html'
})
export class DynamicUIPrimengInputControlComponent extends DynamicUIPrimengFormControlComponent {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
