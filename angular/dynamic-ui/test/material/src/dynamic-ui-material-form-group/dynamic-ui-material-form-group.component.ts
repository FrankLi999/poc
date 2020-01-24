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
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";

@Component({
    selector: "dynamic-ui-material-form-group",
    templateUrl: "./dynamic-ui-material-form-group.component.html"
})
export class DynamicUIMaterialFormGroupComponent extends BaseFormGroupComponent implements  OnInit {

    @Input() group: FormGroup;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;

    @ViewChildren(DynamicUIMaterialFormControlComponent) components: QueryList<DynamicUIMaterialFormControlComponent>;
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
