import { EventEmitter, QueryList, ChangeDetectorRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
export declare class DynamicUIPrimengDynamicComponent extends BaseComponent {
    private viewContainerRef;
    private cfr;
    protected changeDetectorRef: ChangeDetectorRef;
    group: FormGroup;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective>;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    components: QueryList<DynamicUIPrimengFormControlComponent>;
    type: string;
    private htmlTemplate;
    componentRef: ComponentRef<BaseFormControlComponent>;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
}
