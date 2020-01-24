import {
  Component,
  ChangeDetectorRef
} from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService
} from "@bpw-ui/base";

@Component({
  selector: 'dynamic-ui-primeng-autocomplete',
  templateUrl: './dynamic-ui-primeng.autocomplete.component.html',
})
export class DynamicUIPrimengAutocompleteComponent extends DynamicUIPrimengFormControlComponent {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
