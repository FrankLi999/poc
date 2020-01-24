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
var DynamicUIPrimengFormComponent = (function (_super) {
    __extends(DynamicUIPrimengFormComponent, _super);
    function DynamicUIPrimengFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        return _this;
    }
    return DynamicUIPrimengFormComponent;
}(base_1.BaseFormComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIPrimengFormComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DynamicUIPrimengFormComponent.prototype, "formModel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormComponent.prototype, "templates", void 0);
__decorate([
    core_1.ViewChildren(dynamic_ui_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormComponent.prototype, "components", void 0);
DynamicUIPrimengFormComponent = __decorate([
    core_1.Component({
        selector: "dynamic-ui-primeng-form",
        templateUrl: "./dynamic-ui-primeng-form.component.html"
    })
], DynamicUIPrimengFormComponent);
exports.DynamicUIPrimengFormComponent = DynamicUIPrimengFormComponent;

//# sourceMappingURL=dynamic-ui-primeng-form.component.js.map
