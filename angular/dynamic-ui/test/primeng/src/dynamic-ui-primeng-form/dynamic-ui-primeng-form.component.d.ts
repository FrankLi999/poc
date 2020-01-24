import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormComponent, BaseFormControlEvent, ComponentModel, ComponentTemplateDirective } from '@bpw-ui/base';
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
export declare class DynamicUIPrimengFormComponent extends BaseFormComponent {
    group: FormGroup;
    formModel: Array<ComponentModel>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    templates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIPrimengFormControlComponent>;
}
