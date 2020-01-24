import { EventEmitter, QueryList, ChangeDetectorRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
export declare class DynamicUIBasicDynamicComponent extends BaseComponent {
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
    components: QueryList<DynamicUIBasicFormControlComponent>;
    type: string;
    private htmlTemplate;
    componentRef: ComponentRef<BaseFormControlComponent>;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
}
