import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIPrimengCompositeComponent } from '../dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component';
export declare class DynamicUIPrimengColumnsComponent extends DynamicUIPrimengCompositeComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected formService: DynamicUIFormService;
    protected validationService: DynamicUIFormValidationService;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
}
