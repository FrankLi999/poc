import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormComponent, BaseFormControlEvent, ComponentModel, ComponentTemplateDirective } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
export declare class DynamicUIMaterialFormComponent extends BaseFormComponent {
    group: FormGroup;
    formModel: Array<ComponentModel>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    templates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIMaterialFormControlComponent>;
}
