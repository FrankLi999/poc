import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
export declare class DynamicUIBasicFormComponent extends BaseFormComponent {
    group: FormGroup;
    formModel: Array<ComponentModel>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIBasicFormControlComponent>;
}
