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
  BaseFormControlEventType,
  BaseFormCompositeComponent,
  DynamicUIFormService,
  DynamicUIFormValidationService
} from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";

@Component({
  selector: 'dynamic-ui-material-composite',
  templateUrl: './dynamic-ui-material-composite.component.html'
})
export class DynamicUIMaterialCompositeComponent extends BaseFormCompositeComponent {
  @Input() componentId: boolean;
  @Input() group: FormGroup;
  @Input() model: ComponentModel;
  @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
  @ViewChildren(DynamicUIMaterialFormControlComponent) components: QueryList<DynamicUIMaterialFormControlComponent>;

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected formService: DynamicUIFormService,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
