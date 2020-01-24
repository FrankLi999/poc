import { Component, ChangeDetectorRef } from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";
@Component({
  selector: 'dynamic-ui-primeng-rating',
  templateUrl: './dynamic-ui-primeng-rating.component.html'
})
export class  DynamicUIPrimengRatingComponent extends  DynamicUIPrimengFormControlComponent {

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService:DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
