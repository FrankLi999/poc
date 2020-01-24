import { OnInit, AfterViewInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, EventEmitter, QueryList, ComponentRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import { ComponentModel, BaseFormControlEvent, ComponentTemplateDirective } from "@bpw-ui/base";
export declare class DynamicUIPrimengControlComponent implements OnInit, AfterViewInit, OnDestroy {
    private viewContainerRef;
    private cfr;
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
    htmlTemplate: string;
    componentRef: ComponentRef<DynamicUIPrimengFormControlComponent>;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onEvent(): void;
}
