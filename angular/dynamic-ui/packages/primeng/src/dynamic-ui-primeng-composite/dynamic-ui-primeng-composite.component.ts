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
  DynamicUIFormService,
  DynamicUIFormValidationService,
  BaseFormCompositeComponent
} from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";

@Component({
  selector: 'dynamic-ui-primeng-composite',
  templateUrl: './dynamic-ui-primeng-composite.component.html'
})
export class DynamicUIPrimengCompositeComponent extends BaseFormCompositeComponent  {
  @Input() componentId: boolean;
  @Input() group: FormGroup;
  @Input() model: ComponentModel;
  @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
  @ViewChildren(DynamicUIPrimengFormControlComponent) components: QueryList<DynamicUIPrimengFormControlComponent>;

  constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected formService: DynamicUIFormService,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }
}
