import { EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { BaseFormControlEvent, ComponentModel, ComponentTemplateDirective, DynamicUIFormService, BaseFormCompositeComponent, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
export declare class DynamicUIBasicCompositeComponent extends BaseFormCompositeComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected formService: DynamicUIFormService;
    protected validationService: DynamicUIFormValidationService;
    componentId: boolean;
    group: FormGroup;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    customEvent: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIBasicFormControlComponent>;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
}
