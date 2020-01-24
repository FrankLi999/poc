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
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";

@Component({
    selector: "dynamic-ui-primeng-form-group",
    templateUrl: "./dynamic-ui-primeng-form-group.component.html"
})
export class DynamicUIPrimengFormGroupComponent extends BaseFormGroupComponent implements  OnInit {

    @Input() group: FormGroup;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;

    @ViewChildren(DynamicUIPrimengFormControlComponent) components: QueryList<DynamicUIPrimengFormControlComponent>;
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
