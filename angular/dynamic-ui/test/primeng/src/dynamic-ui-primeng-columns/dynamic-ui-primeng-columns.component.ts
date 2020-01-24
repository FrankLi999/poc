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
  BaseComponent,
  BaseFormControlEvent,
  ComponentTemplateDirective,
  ComponentModel,
  DynamicUIFormService,
  DynamicUIFormValidationService
} from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
import { DynamicUIPrimengCompositeComponent } from '../dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component';
@Component({
  selector: 'dynamic-ui-primeng-columns',
  templateUrl: './dynamic-ui-primeng-columns.component.html'
})
export class DynamicUIPrimengColumnsComponent extends DynamicUIPrimengCompositeComponent  {
  type = "columns";
  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected formService: DynamicUIFormService,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, formService, validationService);
  }
}
