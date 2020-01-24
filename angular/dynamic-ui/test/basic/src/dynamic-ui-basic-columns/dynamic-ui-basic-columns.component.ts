import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from "@angular/forms";

import {
  BaseFormGroupComponent,
  BaseFormControlComponent,
  BaseFormControlEvent,
  ComponentTemplateDirective,
  ComponentModel,
  DynamicUIFormValidationService,
  DynamicUIFormService
} from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import { DynamicUIBasicCompositeComponent } from '../dynamic-ui-basic-composite/dynamic-ui-basic-composite.component';
@Component({
  selector: 'dynamic-ui-basic-columns',
  templateUrl: './dynamic-ui-basic-columns.component.html'
})
export class DynamicUIBasicColumnsComponent extends  DynamicUIBasicCompositeComponent  {
  type = "columns";
  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected formService: DynamicUIFormService,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, formService, validationService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
