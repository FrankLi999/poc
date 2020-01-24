import { OnInit, EventEmitter, QueryList, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormGroupComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
export declare class DynamicUIPrimengFormGroupComponent extends BaseFormGroupComponent implements OnInit {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    group: FormGroup;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIPrimengFormControlComponent>;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
}
