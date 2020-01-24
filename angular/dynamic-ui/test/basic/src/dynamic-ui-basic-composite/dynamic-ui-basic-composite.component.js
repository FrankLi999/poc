"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = require("@bpw-ui/base");
var dynamic_ui_basic_form_control_component_1 = require("../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component");
var DynamicUIBasicCompositeComponent = (function (_super) {
    __extends(DynamicUIBasicCompositeComponent, _super);
    function DynamicUIBasicCompositeComponent(changeDetectorRef, formService, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.formService = formService;
        _this.validationService = validationService;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        _this.customEvent = new core_1.EventEmitter();
        return _this;
    }
    return DynamicUIBasicCompositeComponent;
}(base_1.BaseFormCompositeComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIBasicCompositeComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIBasicCompositeComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIBasicCompositeComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicCompositeComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicCompositeComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicCompositeComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicCompositeComponent.prototype, "focus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicCompositeComponent.prototype, "customEvent", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicCompositeComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChildren(dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicCompositeComponent.prototype, "components", void 0);
DynamicUIBasicCompositeComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-ui-basic-composite',
        templateUrl: './dynamic-ui-basic-composite.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_b = typeof base_1.DynamicUIFormService !== "undefined" && base_1.DynamicUIFormService) === "function" && _b || Object, typeof (_c = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _c || Object])
], DynamicUIBasicCompositeComponent);
exports.DynamicUIBasicCompositeComponent = DynamicUIBasicCompositeComponent;
var _a, _b, _c;

//# sourceMappingURL=dynamic-ui-basic-composite.component.js.map
