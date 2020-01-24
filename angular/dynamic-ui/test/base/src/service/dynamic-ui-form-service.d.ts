import { FormBuilder, AbstractControl, FormGroup, FormArray } from "@angular/forms";
import { ComponentModel } from "../model/form/component.model";
import { FormModel } from "../model/form/form.model";
import { DynamicUIFormValidationService } from './dynamic-ui-form-validation.service';
export declare class DynamicUIFormService {
    private validationService;
    private formBuilder;
    constructor(validationService: DynamicUIFormValidationService, formBuilder: FormBuilder);
    createExtra(componentModel: ComponentModel): {
        [key: string]: any;
    };
    createFormArray(datagridModel: ComponentModel): FormArray;
    createGroup(components: Array<ComponentModel>): FormGroup;
    createForm(formModel: FormModel, extra?: {
        [key: string]: any;
    } | null): FormGroup;
    createFormGroup(componentModels: Array<ComponentModel>, extra?: {
        [key: string]: any;
    } | null): FormGroup;
    createFormGroupControl(formGroup: {
        [id: string]: AbstractControl;
    }, componentModel: ComponentModel, extra?: {
        [key: string]: any;
    } | null): void;
}
