import { BaseFormControlComponent, BaseFormControlEvent, BaseFormControlEventType } from "./base-form-control.component";
import { ComponentModel } from "../model/form/component.model";
export declare abstract class BaseFormCompositeComponent extends BaseFormControlComponent {
    type: string;
    trackByFn(_index: number, model: ComponentModel): string;
    onEvent($event: BaseFormControlEvent, type: BaseFormControlEventType): void;
}
