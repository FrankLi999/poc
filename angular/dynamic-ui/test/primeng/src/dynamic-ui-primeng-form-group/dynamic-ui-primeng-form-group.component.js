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
var dynamic_ui_primeng_form_control_component_1 = require("../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component");
var DynamicUIPrimengFormGroupComponent = (function (_super) {
    __extends(DynamicUIPrimengFormGroupComponent, _super);
    function DynamicUIPrimengFormGroupComponent(changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        _this.type = "group";
        return _this;
    }
    DynamicUIPrimengFormGroupComponent.prototype.ngOnInit = function () {
        // console.log(this.group);
        // console.log(this.model);
    };
    return DynamicUIPrimengFormGroupComponent;
}(base_1.BaseFormGroupComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIPrimengFormGroupComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIPrimengFormGroupComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormGroupComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormGroupComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormGroupComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormGroupComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormGroupComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChildren(dynamic_ui_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormGroupComponent.prototype, "components", void 0);
DynamicUIPrimengFormGroupComponent = __decorate([
    core_1.Component({
        selector: "dynamic-ui-primeng-form-group",
        templateUrl: "./dynamic-ui-primeng-form-group.component.html"
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_b = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _b || Object])
], DynamicUIPrimengFormGroupComponent);
exports.DynamicUIPrimengFormGroupComponent = DynamicUIPrimengFormGroupComponent;
var _a, _b;

//# sourceMappingURL=dynamic-ui-primeng-form-group.component.js.map
