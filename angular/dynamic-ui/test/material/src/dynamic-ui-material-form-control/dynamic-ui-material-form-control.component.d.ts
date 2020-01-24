import { EventEmitter, OnChanges, QueryList, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatAutocomplete, MatCheckbox, MatDatepicker, MatFormField, MatRadioGroup, MatSelect, MatSlider, MatSlideToggle } from "@angular/material";
import { DynamicUIFormValidationService, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { MatFormControlType } from "../dynamic-ui-material-form.const";
export declare type MatFormControlComponent = MatAutocomplete | MatCheckbox | MatDatepicker<Date> | MatFormField | MatRadioGroup | MatSelect | MatSlider | MatSlideToggle;
export declare class DynamicUIMaterialFormControlComponent extends BaseFormControlComponent implements OnChanges {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    private _showCharacterCount;
    componentId: boolean;
    context: ComponentModel;
    group: FormGroup;
    hasErrorMessaging: boolean;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    showCharacterHint: boolean;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    matViewChild: MatFormControlComponent | undefined;
    type: MatFormControlType | null;
    static getFormControlType(model: ComponentModel): MatFormControlType | null;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnChanges(changes: SimpleChanges): void;
    readonly characterCount: number | null;
}
