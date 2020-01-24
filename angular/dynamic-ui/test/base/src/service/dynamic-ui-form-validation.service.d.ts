import { AbstractControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { ComponentModel } from "../model/form/component.model";
import { ValidationModel } from "../model/form/validation.model";
export declare type DynamicUIValidatorFactory = (args: any) => ValidatorFn | AsyncValidatorFn;
export declare type DynamicUIValidatorsToken = (ValidatorFn | AsyncValidatorFn)[];
export declare class DynamicUIFormValidationService {
    private ngValidators;
    private ngAsyncValidators;
    constructor(ngValidators: ValidatorFn[], ngAsyncValidators: AsyncValidatorFn[]);
    private getValidatorFn(validatorName, validatorArgs?, validatorsToken?);
    private getValidatorFns(validatorsModel, validatorsToken?);
    getValidatorByName(validatorName: string, validatorArgs?: any): ValidatorFn;
    getAsyncValidatorByName(validatorName: string, validatorArgs?: any): AsyncValidatorFn;
    getValidator(validatorConfig: ValidationModel): ValidatorFn | null;
    getAsyncValidator(validatorConfig: ValidationModel): AsyncValidatorFn | null;
    getValidators(validatorsConfig: ValidationModel): ValidatorFn;
    getAsyncValidators(validatorsConfig: ValidationModel): AsyncValidatorFn;
    createErrorMessages(control: AbstractControl, model: ComponentModel): string[];
}
