import { EventEmitter, OnChanges, QueryList, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicUIFormValidationService, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
export declare const enum DynamicUIBasicFormControlType {
    Array = 1,
    Checkbox = 2,
    Group = 3,
    Input = 4,
    RadioGroup = 5,
    Select = 6,
    TextArea = 7,
    Columns = 8,
}
export declare class DynamicUIBasicFormControlComponent extends BaseFormControlComponent implements OnChanges {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    componentId: boolean;
    context: ComponentModel;
    group: FormGroup;
    hasErrorMessaging: boolean;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    type: DynamicUIBasicFormControlType | null;
    static getFormControlType(model: ComponentModel): DynamicUIBasicFormControlType | null;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
