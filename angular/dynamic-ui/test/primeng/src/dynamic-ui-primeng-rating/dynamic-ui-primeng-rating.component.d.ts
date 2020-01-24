import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import { DynamicUIFormValidationService } from "@bpw-ui/base";
export declare class DynamicUIPrimengRatingComponent extends DynamicUIPrimengFormControlComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
}
