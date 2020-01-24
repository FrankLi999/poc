import {
  Component,
  ContentChildren,
  OnInit,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    BaseFormGroupComponent,
    BaseFormControlEvent,
    ComponentTemplateDirective,
    ComponentModel,
    DynamicUIFormValidationService
} from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";

@Component({
    selector: "dynamic-ui-basic-form-group",
    templateUrl: "./dynamic-ui-basic-form-group.component.html"
})
export class DynamicUIBasicFormGroupComponent extends BaseFormGroupComponent implements  OnInit {
    @Input() componentId: boolean;
    @Input() group: FormGroup;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;

    @ViewChildren(DynamicUIBasicFormControlComponent) components: QueryList<DynamicUIBasicFormControlComponent>;
    type = "group";

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, validationService);
    }
    ngOnInit() {
        // console.log(this.group);
        // console.log(this.model);
    }
}
