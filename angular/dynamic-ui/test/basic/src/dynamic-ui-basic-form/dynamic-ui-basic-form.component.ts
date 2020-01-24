import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    BaseFormComponent,
    BaseFormControlEvent,
    ComponentTemplateDirective,
    ComponentModel,
} from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";

@Component({
    selector: "dynamic-ui-basic-form",
    templateUrl: "./dynamic-ui-basic-form.component.html"
})
export class DynamicUIBasicFormComponent extends BaseFormComponent {

    @Input() group: FormGroup;
    @Input() formModel: Array<ComponentModel>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) nestedTemplates: QueryList<ComponentTemplateDirective>;

    @ViewChildren(DynamicUIBasicFormControlComponent) components: QueryList<DynamicUIBasicFormControlComponent>;
}
