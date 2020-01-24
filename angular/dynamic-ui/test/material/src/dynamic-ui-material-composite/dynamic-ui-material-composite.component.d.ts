import { EventEmitter, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { BaseFormControlEvent, ComponentTemplateDirective, ComponentModel, BaseFormCompositeComponent, DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
export declare class DynamicUIMaterialCompositeComponent extends BaseFormCompositeComponent {
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
    components: QueryList<DynamicUIMaterialFormControlComponent>;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
}
