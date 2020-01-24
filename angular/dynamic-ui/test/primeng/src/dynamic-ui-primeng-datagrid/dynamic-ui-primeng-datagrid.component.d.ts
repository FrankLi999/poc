import { OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray } from "@angular/forms";
import { DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIPrimengCompositeComponent } from '../dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component';
export declare class DynamicUIPrimengDatagridComponent extends DynamicUIPrimengCompositeComponent implements OnInit {
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
