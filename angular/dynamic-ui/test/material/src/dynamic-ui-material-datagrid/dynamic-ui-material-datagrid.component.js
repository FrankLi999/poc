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
var dynamic_ui_material_composite_component_1 = require("../dynamic-ui-material-composite/dynamic-ui-material-composite.component");
var DynamicUIMaterialDatagridComponent = (function (_super) {
    __extends(DynamicUIMaterialDatagridComponent, _super);
    function DynamicUIMaterialDatagridComponent(changeDetectorRef, formService, validationService) {
        var _this = _super.call(this, changeDetectorRef, formService, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.formService = formService;
        _this.validationService = validationService;
        _this.type = "datagrid";
        return _this;
    }
    DynamicUIMaterialDatagridComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.formArray = this.group.controls[this.model.key];
    };
    DynamicUIMaterialDatagridComponent.prototype.removeColumn = function (idx) {
        this.formArray.removeAt(idx);
    };
    DynamicUIMaterialDatagridComponent.prototype.newRow = function () {
        this.formArray.push(this.formService.createGroup(this.model.components));
    };
    return DynamicUIMaterialDatagridComponent;
}(dynamic_ui_material_composite_component_1.DynamicUIMaterialCompositeComponent));
DynamicUIMaterialDatagridComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-ui-material-datagrid',
        templateUrl: './dynamic-ui-material-datagrid.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_a = typeof base_1.DynamicUIFormService !== "undefined" && base_1.DynamicUIFormService) === "function" && _a || Object, typeof (_b = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _b || Object])
], DynamicUIMaterialDatagridComponent);
exports.DynamicUIMaterialDatagridComponent = DynamicUIMaterialDatagridComponent;
var _a, _b;

//# sourceMappingURL=dynamic-ui-material-datagrid.component.js.map
