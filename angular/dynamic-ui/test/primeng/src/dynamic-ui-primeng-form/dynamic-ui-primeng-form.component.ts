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
} from '@bpw-ui/base';
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";

@Component({
    selector: "dynamic-ui-primeng-form",
    templateUrl: "./dynamic-ui-primeng-form.component.html"
})
export class DynamicUIPrimengFormComponent extends BaseFormComponent {

  @Input() group: FormGroup;
  @Input() formModel: Array<ComponentModel>;

  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

  @ContentChildren(ComponentTemplateDirective) templates: QueryList<ComponentTemplateDirective>;

  @ViewChildren(DynamicUIPrimengFormControlComponent) components: QueryList<DynamicUIPrimengFormControlComponent>;
}
