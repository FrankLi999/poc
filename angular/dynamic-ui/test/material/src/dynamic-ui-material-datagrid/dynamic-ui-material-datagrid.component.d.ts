import { ChangeDetectorRef, OnInit } from '@angular/core';
import { FormArray } from "@angular/forms";
import { DynamicUIFormService, DynamicUIFormValidationService } from "@bpw-ui/base";
import { DynamicUIMaterialCompositeComponent } from '../dynamic-ui-material-composite/dynamic-ui-material-composite.component';
export declare class DynamicUIMaterialDatagridComponent extends DynamicUIMaterialCompositeComponent implements OnInit {
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
