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
var base_1 = require("@bpw-ui/base");
var dynamic_ui_primeng_composite_component_1 = require("../dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component");
var DynamicUIPrimengDatagridComponent = (function (_super) {
    __extends(DynamicUIPrimengDatagridComponent, _super);
    function DynamicUIPrimengDatagridComponent(changeDetectorRef, formService, validationService) {
        var _this = _super.call(this, changeDetectorRef, formService, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.formService = formService;
        _this.validationService = validationService;
        _this.type = "datagrid";
        return _this;
    }
    DynamicUIPrimengDatagridComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.formArray = this.group.controls[this.model.key];
    };
    DynamicUIPrimengDatagridComponent.prototype.removeColumn = function (idx) {
        this.formArray.removeAt(idx);
    };
    DynamicUIPrimengDatagridComponent.prototype.newRow = function () {
        this.formArray.push(this.formService.createGroup(this.model.components));
    };
    return DynamicUIPrimengDatagridComponent;
}(dynamic_ui_primeng_composite_component_1.DynamicUIPrimengCompositeComponent));
DynamicUIPrimengDatagridComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-ui-primeng-datagrid',
        templateUrl: './dynamic-ui-primeng-datagrid.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_a = typeof base_1.DynamicUIFormService !== "undefined" && base_1.DynamicUIFormService) === "function" && _a || Object, typeof (_b = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _b || Object])
], DynamicUIPrimengDatagridComponent);
exports.DynamicUIPrimengDatagridComponent = DynamicUIPrimengDatagridComponent;
var _a, _b;

//# sourceMappingURL=dynamic-ui-primeng-datagrid.component.js.map
