import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIMaterialCompositeComponent } from '../dynamic-ui-material-composite/dynamic-ui-material-composite.component';
export declare class DynamicUIMaterialColumnsComponent extends DynamicUIMaterialCompositeComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected formService: DynamicUIFormService;
    protected validationService: DynamicUIFormValidationService;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
}
