import { EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { BaseFormControlEvent, ComponentTemplateDirective, ComponentModel, DynamicUIFormService, DynamicUIFormValidationService, BaseFormCompositeComponent } from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
export declare class DynamicUIPrimengCompositeComponent extends BaseFormCompositeComponent {
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
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIPrimengFormControlComponent>;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
}
