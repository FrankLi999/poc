import { OnInit, AfterViewInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, QueryList, EventEmitter, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { BaseFormControlComponent, ComponentModel, BaseFormControlEvent, ComponentTemplateDirective, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
export declare class DynamicUIMaterialControlComponent extends BaseFormControlComponent implements OnInit, AfterViewInit, OnDestroy {
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
    showCharacterHint: boolean;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    htmlTemplate: string;
    componentRef: ComponentRef<DynamicUIMaterialFormControlComponent>;
    type: string;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
