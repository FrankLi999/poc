import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormControlComponent, BaseFormControlEvent, BaseFormControlEventType } from "./base-form-control.component";
import { ComponentModel } from "../model/form/component.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";
export declare abstract class BaseFormComponent {
    formModel: Array<ComponentModel>;
    group: FormGroup;
    type: string;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    customEvent: EventEmitter<BaseFormControlEvent>;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<BaseFormControlComponent>;
    trackByFn(_index: number, model: ComponentModel): string;
    onEvent($event: BaseFormControlEvent, type: BaseFormControlEventType): void;
}
