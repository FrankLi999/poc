import { EventEmitter, OnChanges, QueryList, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoComplete, Calendar, Checkbox, Chips, Dropdown, Editor, InputSwitch, MultiSelect, Rating, Slider } from "primeng/primeng";
import { DynamicUIFormValidationService, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { PrimeNGFormControlType } from "../dynamic-ui-primeng-form.const";
export declare type PrimengFormControlType = AutoComplete | Calendar | Checkbox | Chips | Dropdown | Editor | InputSwitch | MultiSelect | Rating | Slider;
export declare class DynamicUIPrimengFormControlComponent extends BaseFormControlComponent implements OnChanges {
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
    pViewChild: PrimengFormControlType | undefined;
    suggestions: string[];
    type: PrimeNGFormControlType | null;
    static getFormControlType(model: ComponentModel): PrimeNGFormControlType | null;
    static getTemplateDirectives(component: PrimengFormControlType): any | null;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnChanges(changes: SimpleChanges): void;
    protected setTemplateDirective(directive: ComponentTemplateDirective): void;
    setTemplates(): void;
    onAutoComplete($event: any): void;
}
