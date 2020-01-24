import { ChangeDetectorRef } from '@angular/core';
import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import { DynamicUIFormValidationService } from "@bpw-ui/base";
export declare class DynamicUIBasicFieldsetComponent extends DynamicUIBasicFormControlComponent {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
}
