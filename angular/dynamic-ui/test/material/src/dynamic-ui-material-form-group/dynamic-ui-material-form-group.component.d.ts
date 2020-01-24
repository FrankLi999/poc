import { OnInit, EventEmitter, QueryList, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseFormGroupComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
export declare class DynamicUIMaterialFormGroupComponent extends BaseFormGroupComponent implements OnInit {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    group: FormGroup;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIMaterialFormControlComponent>;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
}
