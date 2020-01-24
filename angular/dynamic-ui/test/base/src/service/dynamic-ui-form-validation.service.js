"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_utils_1 = require("../utils/core.utils");
var DynamicUIFormValidationService = (function () {
    function DynamicUIFormValidationService(ngValidators, ngAsyncValidators) {
        this.ngValidators = ngValidators;
        this.ngAsyncValidators = ngAsyncValidators;
    }
    DynamicUIFormValidationService.prototype.getValidatorFn = function (validatorName, validatorArgs, validatorsToken) {
        if (validatorArgs === void 0) { validatorArgs = null; }
        if (validatorsToken === void 0) { validatorsToken = this.ngValidators; }
        var validatorFn = null;
        if (forms_1.Validators.hasOwnProperty(validatorName)) {
            validatorFn = forms_1.Validators[validatorName];
        }
        else if (validatorsToken) {
            validatorFn = validatorsToken.find(function (validatorFn) { return validatorFn.name === validatorName; });
        }
        if (!core_utils_1.Utils.isFunction(validatorFn)) {
            throw new Error("validator \"" + validatorName + "\" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS");
        }
        if (core_utils_1.Utils.isDefined(validatorArgs)) {
            return validatorFn(validatorArgs);
        }
        return validatorFn;
    };
    DynamicUIFormValidationService.prototype.getValidatorFns = function (validatorsModel, validatorsToken) {
        var _this = this;
        if (validatorsToken === void 0) { validatorsToken = this.ngValidators; }
        var validatorsConfig;
        var validatorFns = [];
        if (core_utils_1.Utils.isTrueObject(validatorsModel)) {
            validatorFns = Object.keys(validatorsModel).filter(function (validatorFnKey) {
                if (validatorFnKey === 'customPrivate') {
                    return false;
                }
                else if (validatorFnKey === 'custom') {
                    var str = validatorsModel[validatorFnKey];
                    return core_utils_1.Utils.isString(str) && (!core_utils_1.Utils.isEmptyString(str));
                }
                return true;
            }).map(function (validatorFnKey) {
                var validatorName, validatorArgs;
                if (validatorFnKey === 'custom') {
                    validatorName = validatorFnKey; //validatorsModel[validatorFnKey];
                    validatorArgs = null;
                }
                else {
                    validatorName = validatorFnKey;
                    //validatorArgs = validatorsModel[validatorFnKey];
                    validatorArgs = null;
                }
                return _this.getValidatorFn(validatorName, validatorArgs, validatorsToken);
            });
            if (validatorsModel.custom && (!core_utils_1.Utils.isString(validatorsModel.custom))) {
                var nameArgs = validatorsModel.custom;
                for (var i = 0; i < nameArgs.length; i++) {
                    validatorFns.push(this.getValidatorFn(nameArgs[i].name, nameArgs[i].args, validatorsToken));
                }
            }
        }
        return validatorFns;
    };
    DynamicUIFormValidationService.prototype.getValidatorByName = function (validatorName, validatorArgs) {
        if (validatorArgs === void 0) { validatorArgs = null; }
        return this.getValidatorFn(validatorName, validatorArgs);
    };
    DynamicUIFormValidationService.prototype.getAsyncValidatorByName = function (validatorName, validatorArgs) {
        if (validatorArgs === void 0) { validatorArgs = null; }
        return this.getValidatorFn(validatorName, validatorArgs, this.ngAsyncValidators);
    };
    DynamicUIFormValidationService.prototype.getValidator = function (validatorConfig) {
        var validator = forms_1.Validators.nullValidator;
        if (validatorConfig && core_utils_1.Utils.isString(validatorConfig.custom)) {
            var validatorName = validatorConfig.custom;
            //validator = this.getValidatorFn(validatorName, validatorConfig[validatorName]) as ValidatorFn;
            validator = this.getValidatorFn(validatorName, null);
        }
        return validator;
    };
    DynamicUIFormValidationService.prototype.getAsyncValidator = function (validatorConfig) {
        var validator = null;
        if (validatorConfig && core_utils_1.Utils.isString(validatorConfig.custom)) {
            var validatorName = validatorConfig.custom;
            //return this.getValidatorFn(validatorName, validatorConfig[validatorName], this.ngAsyncValidators) as AsyncValidatorFn;
            return this.getValidatorFn(validatorName, null, this.ngAsyncValidators);
        }
        return validator;
    };
    DynamicUIFormValidationService.prototype.getValidators = function (validatorsConfig) {
        var validatorFn = forms_1.Validators.nullValidator;
        if (validatorsConfig) {
            var vfns = this.getValidatorFns(validatorsConfig);
            if (vfns.length == 1) {
                validatorFn = vfns[0];
            }
            else if (vfns.length > 1) {
                validatorFn = forms_1.Validators.compose(vfns);
            }
        }
        return validatorFn;
    };
    //TODO
    DynamicUIFormValidationService.prototype.getAsyncValidators = function (validatorsConfig) {
        var asyncValidatorFn = forms_1.Validators.composeAsync([]);
        if (validatorsConfig) {
            var vfns = this.getValidatorFns(validatorsConfig, this.ngAsyncValidators);
            if (vfns.length == 1) {
                asyncValidatorFn = vfns[0];
            }
            else if (vfns.length > 1) {
                asyncValidatorFn = forms_1.Validators.composeAsync(vfns);
            }
        }
        return asyncValidatorFn;
    };
    DynamicUIFormValidationService.prototype.createErrorMessages = function (control, model) {
        return Object.keys(control.errors || {}).map(function (errorCode) {
            var error = control.getError(errorCode), message = "Validation error: " + errorCode, messageKey = core_utils_1.Utils.equals(errorCode, "minlength", "maxlength") ? errorCode.replace("length", "Length") : errorCode;
            if (model.errorMessages.hasOwnProperty(messageKey)) {
                message = model.errorMessages[messageKey].replace(/{{\s*(.+?)\s*}}/mg, function (match, expression) {
                    var propertySource = model, propertyName = expression;
                    if (expression.indexOf("validator.") >= 0) {
                        propertySource = error;
                        propertyName = expression.replace("validator.", "");
                    }
                    return propertySource[propertyName] ? propertySource[propertyName] : null;
                });
            }
            return message;
        });
    };
    return DynamicUIFormValidationService;
}());
DynamicUIFormValidationService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()), __param(0, core_1.Inject(forms_1.NG_VALIDATORS)),
    __param(1, core_1.Optional()), __param(1, core_1.Inject(forms_1.NG_ASYNC_VALIDATORS)),
    __metadata("design:paramtypes", [Array, Array])
], DynamicUIFormValidationService);
exports.DynamicUIFormValidationService = DynamicUIFormValidationService;

//# sourceMappingURL=dynamic-ui-form-validation.service.js.map
