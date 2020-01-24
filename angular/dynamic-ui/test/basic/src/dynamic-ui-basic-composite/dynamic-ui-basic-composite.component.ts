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
  import { FormGroup, FormArray } from "@angular/forms";

  import {
    BaseFormGroupComponent,
    BaseFormControlComponent,
    BaseComponent,
    BaseFormControlEvent,
    ComponentModel,
    ComponentTemplateDirective,
    DynamicUIFormService,
    BaseFormControlEventType,
    BaseFormCompositeComponent,
    DynamicUIFormValidationService
  } from "@bpw-ui/base";
  import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";

  @Component({
    selector: 'dynamic-ui-basic-composite',
    templateUrl: './dynamic-ui-basic-composite.component.html'
  })
  export class DynamicUIBasicCompositeComponent extends BaseFormCompositeComponent {
    @Input() componentId: boolean;
    @Input() group: FormGroup;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() customEvent: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
    @ViewChildren(DynamicUIBasicFormControlComponent) components: QueryList<DynamicUIBasicFormControlComponent>;

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected formService: DynamicUIFormService,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, validationService);
    }
  }
