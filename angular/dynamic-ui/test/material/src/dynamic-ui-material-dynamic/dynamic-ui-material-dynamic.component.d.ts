import { EventEmitter, QueryList, ChangeDetectorRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent, BaseFormControlComponent, BaseFormControlEvent, ComponentTemplateDirective, ComponentModel } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
export declare class DynamicUIMaterialDynamicComponent extends BaseComponent {
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
    components: QueryList<DynamicUIMaterialFormControlComponent>;
    type: string;
    private htmlTemplate;
    componentRef: ComponentRef<BaseFormControlComponent>;
    constructor(viewContainerRef: ViewContainerRef, cfr: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
}
