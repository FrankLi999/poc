import { ChangeDetectorRef, AfterViewInit, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from "@angular/core";
import { ComponentModel } from "../model/form/component.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";
export declare abstract class BaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    protected changeDetectorRef: ChangeDetectorRef;
    componentId: boolean;
    context: ComponentModel | null;
    hasFocus: boolean;
    model: ComponentModel;
    nestedTemplates: QueryList<ComponentTemplateDirective> | null;
    contentTemplates: QueryList<ComponentTemplateDirective>;
    template: ComponentTemplateDirective;
    abstract type: number | string | null;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setupControl(): void;
    readonly templates: QueryList<ComponentTemplateDirective>;
    setTemplates(): void;
    protected getModelId(): string;
}
