import { QueryList, SimpleChanges, OnChanges, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { DynamicUIFormValidationService } from '../service/dynamic-ui-form-validation.service';
import { BaseFormCompositeComponent } from './base-form-composite.component';
import { ComponentTemplateDirective } from "../directive/component-template.directive";
export declare abstract class BaseFormGroupComponent extends BaseFormCompositeComponent implements OnChanges, AfterViewInit {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    setupControl(): void;
    readonly templates: QueryList<ComponentTemplateDirective>;
    setTemplates(): void;
    protected getModelId(): string;
}
