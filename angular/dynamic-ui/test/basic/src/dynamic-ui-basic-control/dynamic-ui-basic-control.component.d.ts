import { OnInit, AfterViewInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, EventEmitter, QueryList, ComponentRef, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ComponentModel, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
export declare class DynamicUIBasicControlComponent extends BaseFormControlComponent implements OnInit, AfterViewInit, OnDestroy {
    private viewContainerRef;
    private cfr;
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
    componentRef: ComponentRef<DynamicUIBasicFormControlComponent>;
    htmlTemplate: string;
    type: string;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onEvent(): void;
}
