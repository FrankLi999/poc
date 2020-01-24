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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var form_model_1 = require("../model/form/form.model");
var dynamic_ui_form_validation_service_1 = require("./dynamic-ui-form-validation.service");
var DynamicUIFormService = (function () {
    function DynamicUIFormService(validationService, formBuilder) {
        this.validationService = validationService;
        this.formBuilder = formBuilder;
    }
    DynamicUIFormService.prototype.createExtra = function (componentModel) {
        return {
            validator: this.validationService.getValidator(componentModel.validate),
            asyncValidator: this.validationService.getAsyncValidator(componentModel.asyncValidate)
        };
    };
    DynamicUIFormService.prototype.createFormArray = function (datagridModel) {
        var components = datagridModel.components;
        var formArray = [];
        for (var i = 0; i < datagridModel.numRows; i++) {
            var formGroup = {};
            for (var index = 0; index < components.length; index++) {
                var componnentModel = components[index], extra = this.createExtra(componnentModel);
                this.createFormGroupControl(formGroup, componnentModel, extra);
            }
            formArray.push(this.formBuilder.group(formGroup));
        }
        return this.formBuilder.array(formArray);
    };
    DynamicUIFormService.prototype.createGroup = function (components) {
        var formGroup = {};
        for (var index = 0; index < components.length; index++) {
            var componnentModel = components[index], extra = this.createExtra(componnentModel);
            this.createFormGroupControl(formGroup, componnentModel, extra);
        }
        return this.formBuilder.group(formGroup);
    };
    DynamicUIFormService.prototype.createForm = function (formModel, extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        var formGroup = {};
        formModel.components.forEach(function (componentModel) {
            _this.createFormGroupControl(formGroup, componentModel);
        });
        return this.formBuilder.group(formGroup, extra);
    };
    DynamicUIFormService.prototype.createFormGroup = function (componentModels, extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        var formGroup = {};
        componentModels.forEach(function (componentModel) {
            var control = _this.createFormGroupControl(formGroup, componentModel);
        });
        return this.formBuilder.group(formGroup, extra);
    };
    DynamicUIFormService.prototype.createFormGroupControl = function (formGroup, componentModel, extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        var control = null;
        if (componentModel.input) {
            var formControlModel = componentModel;
            control = new forms_1.FormControl({
                value: formControlModel.defaultValue ? formControlModel.defaultValue : '',
                disabled: formControlModel.disabled
            }, this.validationService.getValidators(formControlModel.validate), this.validationService.getAsyncValidators(formControlModel.asyncValidate));
            formGroup[componentModel.key] = control;
        }
        else if (componentModel.type === form_model_1.DYNAMIC_UI_COMPONENT_TYPE_DATAGRID) {
            control = this.createFormArray(componentModel);
            formGroup[componentModel.key] = control;
        }
        else if (componentModel.type === form_model_1.DYNAMIC_UI_COMPONENT_TYPE_GROUP) {
            var formGroupModel = componentModel.components, extra_1 = this.createExtra(componentModel);
            control = this.createFormGroup(formGroupModel, extra_1);
            formGroup[componentModel.key] = control;
        }
        else if (componentModel.components) {
            componentModel.components.forEach(function (model) {
                _this.createFormGroupControl(formGroup, model);
            });
        }
        else if (componentModel.columns) {
            componentModel.columns.forEach(function (model) {
                _this.createFormGroupControl(formGroup, model);
            });
        }
    };
    return DynamicUIFormService;
}());
DynamicUIFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [dynamic_ui_form_validation_service_1.DynamicUIFormValidationService,
        forms_1.FormBuilder])
], DynamicUIFormService);
exports.DynamicUIFormService = DynamicUIFormService;

//# sourceMappingURL=dynamic-ui-form-service.js.map
