import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-material-input',
  templateUrl: './dynamic-ui-material-input.component.html'
})
export class DynamicUIMaterialInputComponent extends DynamicUIMaterialFormControlComponent  {
  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
