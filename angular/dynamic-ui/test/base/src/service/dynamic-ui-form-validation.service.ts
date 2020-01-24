import { Injectable, Inject, Optional } from "@angular/core";
import {
    AbstractControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { ComponentModel } from "../model/form/component.model";
import {  ValidationModel, Validation } from "../model/form/validation.model";
import { Utils } from "../utils/core.utils";
import { ValidationUtils } from "../utils/validation.utils";

export type DynamicUIValidatorFactory = (args: any) => ValidatorFn | AsyncValidatorFn;

export type DynamicUIValidatorsToken = (ValidatorFn | AsyncValidatorFn)[];

@Injectable()
export class DynamicUIFormValidationService {

    constructor(@Optional() @Inject(NG_VALIDATORS) private ngValidators: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private ngAsyncValidators: AsyncValidatorFn[]) {}


    private getValidatorFn(validatorName: string, validatorArgs: any = null,
                           validatorsToken: DynamicUIValidatorsToken = this.ngValidators): ValidatorFn | AsyncValidatorFn | never {
        let validatorFn: DynamicUIValidatorFactory | ValidatorFn | AsyncValidatorFn | null = null;
        if (Validators.hasOwnProperty(validatorName)) { // Angular Standard Validators
            validatorFn = (Validators as any)[validatorName];
        } else if (validatorsToken) { // Custom Validators
            validatorFn = validatorsToken.find(validatorFn => validatorFn.name === validatorName);
        }
        if (!Utils.isFunction(validatorFn)) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
        }
        if (Utils.isDefined(validatorArgs)) {
            return (validatorFn as Function)(validatorArgs);
        }
        return validatorFn;
    }

    private getValidatorFns(validatorsModel:  ValidationModel,
                            validatorsToken: DynamicUIValidatorsToken = this.ngValidators): ValidatorFn[] | AsyncValidatorFn[] {

        let validatorsConfig:  {[validatorKey: string]: Validation};
        let validatorFns: ValidatorFn[] | AsyncValidatorFn[] = [];

        if (Utils.isTrueObject(validatorsModel)) {
            validatorFns = Object.keys(validatorsModel).filter(validatorFnKey => {
                    if (validatorFnKey === 'customPrivate') {
                        return false;    
                    } else if (validatorFnKey === 'custom') {
                        let str = validatorsModel[validatorFnKey] as string;
                        return Utils.isString(str) && (!Utils.isEmptyString(str));
                    }
                    return true;
                }).map(validatorFnKey => {
                    let validatorName: string,
                        validatorArgs;
                    if (validatorFnKey === 'custom') {
                        validatorName = validatorFnKey; //validatorsModel[validatorFnKey];
                        validatorArgs = null;
                    } else {
                        validatorName = validatorFnKey;
                        //validatorArgs = validatorsModel[validatorFnKey];
                        validatorArgs = null;
                    }
                    return this.getValidatorFn(validatorName, validatorArgs, validatorsToken);
                });
            if (validatorsModel.custom && (!Utils.isString(validatorsModel.custom))) {
                let nameArgs = validatorsModel.custom as Array<Validation>;
                for (let i = 0; i < nameArgs.length; i++) {
                    validatorFns.push(this.getValidatorFn(nameArgs[i].name, nameArgs[i].args, validatorsToken));
                }
            }
        }
        return validatorFns;
    }

    getValidatorByName(validatorName: string, validatorArgs: any = null): ValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs) as ValidatorFn;
    }

    getAsyncValidatorByName(validatorName: string, validatorArgs: any = null): AsyncValidatorFn {
        return this.getValidatorFn(validatorName, validatorArgs, this.ngAsyncValidators) as AsyncValidatorFn;
    }

    getValidator(validatorConfig: ValidationModel): ValidatorFn | null {
        let validator: ValidatorFn = Validators.nullValidator;
        if (validatorConfig && Utils.isString(validatorConfig.custom)) {
            let validatorName = validatorConfig.custom as string;
            //validator = this.getValidatorFn(validatorName, validatorConfig[validatorName]) as ValidatorFn;
            validator = this.getValidatorFn(validatorName, null) as ValidatorFn;
        }
        return validator;
    }

    getAsyncValidator(validatorConfig: ValidationModel): AsyncValidatorFn | null {
        let validator: AsyncValidatorFn = null;
        if (validatorConfig && Utils.isString(validatorConfig.custom)) {
            let validatorName = validatorConfig.custom as string;
            //return this.getValidatorFn(validatorName, validatorConfig[validatorName], this.ngAsyncValidators) as AsyncValidatorFn;
            return this.getValidatorFn(validatorName, null, this.ngAsyncValidators) as AsyncValidatorFn;
        }
        return validator;
    }

    getValidators(validatorsConfig:  ValidationModel): ValidatorFn {
        let validatorFn: ValidatorFn = Validators.nullValidator;
        if (validatorsConfig) {
            let vfns = this.getValidatorFns(validatorsConfig) as ValidatorFn[];
            if (vfns.length == 1) {
                validatorFn = vfns[0];
            } else if (vfns.length > 1) {
                validatorFn = Validators.compose(vfns);
            }
        }
        return validatorFn;
    }

    //TODO
    getAsyncValidators(validatorsConfig:  ValidationModel): AsyncValidatorFn {
        let asyncValidatorFn: AsyncValidatorFn = Validators.composeAsync([]);
        if (validatorsConfig) {
            let vfns = this.getValidatorFns(validatorsConfig, this.ngAsyncValidators) as AsyncValidatorFn[];
            if (vfns.length == 1) {
                asyncValidatorFn = vfns[0];
            } else if (vfns.length > 1) {
                asyncValidatorFn = Validators.composeAsync(vfns);
            }
        }
        return asyncValidatorFn;
    }

    createErrorMessages(control: AbstractControl, model: ComponentModel): string[] {
        return Object.keys(control.errors || {}).map(errorCode => {
            let error = control.getError(errorCode),
                message = `Validation error: ${errorCode}`,
                messageKey = Utils.equals(errorCode, "minlength", "maxlength") ? errorCode.replace("length", "Length") : errorCode;
            if (model.errorMessages.hasOwnProperty(messageKey)) {
                message = (model.errorMessages[messageKey] as string).replace(/{{\s*(.+?)\s*}}/mg,
                    (match: string, expression: string) => {
                        let propertySource: any = model,
                            propertyName: string = expression;
                        if (expression.indexOf("validator.") >= 0) {
                            propertySource = error;
                            propertyName = expression.replace("validator.", "");
                        }
                        return propertySource[propertyName] ? propertySource[propertyName] : null;
                    });
            }
            return message;
        });
    }
}
