import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-material-date-picker',
  templateUrl: './dynamic-ui-material-date-picker.component.html'
})
export class DynamicUIMaterialDatePickerComponent extends DynamicUIMaterialFormControlComponent  {
  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
