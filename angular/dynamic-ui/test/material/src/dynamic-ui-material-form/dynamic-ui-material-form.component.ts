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
    ComponentModel,
    ComponentTemplateDirective
} from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";

@Component({
    selector: "dynamic-ui-material-form",
    templateUrl: "./dynamic-ui-material-form.component.html"
})
export class DynamicUIMaterialFormComponent extends BaseFormComponent {

  @Input() group: FormGroup;
  @Input() formModel: Array<ComponentModel>;

  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

  @ContentChildren(ComponentTemplateDirective) templates: QueryList<ComponentTemplateDirective>;

  @ViewChildren(DynamicUIMaterialFormControlComponent) components: QueryList<DynamicUIMaterialFormControlComponent>;
}
