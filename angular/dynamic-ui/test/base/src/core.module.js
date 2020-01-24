"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dynamic_ui_form_service_1 = require("./service/dynamic-ui-form-service");
var dynamic_ui_form_validation_service_1 = require("./service/dynamic-ui-form-validation.service");
var component_id_directive_1 = require("./directive/component-id.directive");
var component_template_directive_1 = require("./directive/component-template.directive");
var DynamicUIBaseModule = DynamicUIBaseModule_1 = (function () {
    function DynamicUIBaseModule() {
    }
    DynamicUIBaseModule.forRoot = function () {
        return {
            ngModule: DynamicUIBaseModule_1,
            providers: [
                dynamic_ui_form_service_1.DynamicUIFormService,
                dynamic_ui_form_validation_service_1.DynamicUIFormValidationService
            ]
        };
    };
    return DynamicUIBaseModule;
}());
DynamicUIBaseModule = DynamicUIBaseModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
        declarations: [
            component_id_directive_1.ComponentIdDirective,
            component_template_directive_1.ComponentTemplateDirective
        ],
        exports: [
            component_id_directive_1.ComponentIdDirective,
            component_template_directive_1.ComponentTemplateDirective
        ]
    })
], DynamicUIBaseModule);
exports.DynamicUIBaseModule = DynamicUIBaseModule;
var DynamicUIBaseModule_1;

//# sourceMappingURL=core.module.js.map
