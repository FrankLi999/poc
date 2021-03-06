import { OnInit, EventEmitter, QueryList, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormGroupComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
export declare class DynamicUIBasicFormGroupComponent extends BaseFormGroupComponent implements OnInit {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    componentId: boolean;
    group: FormGroup;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIBasicFormControlComponent>;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
}
