import { Component, ChangeDetectorRef} from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";
@Component({
  selector: 'dynamic-ui-checkbox-primeng',
  templateUrl: './dynamic-ui-primeng-checkbox.component.html'
})
export class DynamicUIPrimengCheckboxComponent extends DynamicUIPrimengFormControlComponent {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }

}
