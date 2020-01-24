import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIFormValidationService, DynamicUIFormService } from "@bpw-ui/base";
import { DynamicUIBasicCompositeComponent } from '../dynamic-ui-basic-composite/dynamic-ui-basic-composite.component';
export declare class DynamicUIBasicColumnsComponent extends DynamicUIBasicCompositeComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected formService: DynamicUIFormService;
    protected validationService: DynamicUIFormValidationService;
    type: string;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
}
