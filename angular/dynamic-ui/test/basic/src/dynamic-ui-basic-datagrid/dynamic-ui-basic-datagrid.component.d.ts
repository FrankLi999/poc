import { OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray } from "@angular/forms";
import { DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIBasicCompositeComponent } from '../dynamic-ui-basic-composite/dynamic-ui-basic-composite.component';
export declare class DynamicUIBasicDatagridComponent extends DynamicUIBasicCompositeComponent implements OnInit {
    protected changeDetectorRef: ChangeDetectorRef;
    protected formService: DynamicUIFormService;
    protected validationService: DynamicUIFormValidationService;
    type: string;
    formArray: FormArray;
    constructor(changeDetectorRef: ChangeDetectorRef, formService: DynamicUIFormService, validationService: DynamicUIFormValidationService);
    ngOnInit(): void;
    removeColumn(idx: number): void;
    newRow(): void;
}
