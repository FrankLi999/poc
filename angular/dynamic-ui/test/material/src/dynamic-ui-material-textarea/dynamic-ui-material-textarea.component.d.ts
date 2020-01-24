import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import { DynamicUIFormValidationService } from "@bpw-ui/base";
export declare class DynamicUIMaterialTextareaComponent extends DynamicUIMaterialFormControlComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
}
