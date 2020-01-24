import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-material-checkbox',
  templateUrl: './dynamic-ui-material-checkbox.component.html'
})
export class DynamicUIMaterialCheckboxComponent extends DynamicUIMaterialFormControlComponent  {
  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
