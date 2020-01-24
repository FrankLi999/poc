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
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import { DynamicUIMaterialCompositeComponent } from '../dynamic-ui-material-composite/dynamic-ui-material-composite.component';
@Component({
  selector: 'dynamic-ui-material-columns',
  templateUrl: './dynamic-ui-material-columns.component.html'
})
export class DynamicUIMaterialColumnsComponent extends DynamicUIMaterialCompositeComponent {
  type = "columns";

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected formService: DynamicUIFormService,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, formService, validationService);
  }
}
