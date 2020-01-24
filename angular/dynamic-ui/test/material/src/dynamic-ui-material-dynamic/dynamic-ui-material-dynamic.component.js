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
var dynamic_ui_material_model_1 = require("../dynamic-ui-material.model");
var dynamic_ui_material_form_control_component_1 = require("../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component");
var DynamicUIMaterialDynamicComponent = (function (_super) {
    __extends(DynamicUIMaterialDynamicComponent, _super);
    function DynamicUIMaterialDynamicComponent(viewContainerRef, cfr, changeDetectorRef) {
        var _this = _super.call(this, changeDetectorRef) || this;
        _this.viewContainerRef = viewContainerRef;
        _this.cfr = cfr;
        _this.changeDetectorRef = changeDetectorRef;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        _this.type = "dynamic";
        _this.htmlTemplate = '';
        return _this;
    }
    DynamicUIMaterialDynamicComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var type = dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent.getFormControlType(this.model);
        try {
            var typ = dynamic_ui_material_model_1.MaterialComponentTypes[type];
            this.viewContainerRef.clear();
            var compFactory = this.cfr.resolveComponentFactory(typ);
            this.componentRef = this.viewContainerRef.createComponent(compFactory);
            var vc = this.componentRef.instance;
            vc.componentId = this.componentId;
            vc.context = this.context;
            vc.group = this.group;
            vc.model = this.model;
            vc.nestedTemplates = this.nestedTemplates;
            vc.blur = this.blur;
            vc.change = this.change;
            vc.focus = this.focus;
            vc.setupControl();
        }
        catch (ex) {
            // if(ex === NoComponentFactoryError) {
            this.htmlTemplate = ex.toString();
            // }
            base_1.Utils.err(ex);
        }
    };
    return DynamicUIMaterialDynamicComponent;
}(base_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIMaterialDynamicComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIMaterialDynamicComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialDynamicComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialDynamicComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialDynamicComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialDynamicComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialDynamicComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChildren(dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialDynamicComponent.prototype, "components", void 0);
DynamicUIMaterialDynamicComponent = __decorate([
    core_1.Component({
        selector: "dynamic-ui-material-dynamic-component",
        template: "{{htmlTemplate}}"
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef])
], DynamicUIMaterialDynamicComponent);
exports.DynamicUIMaterialDynamicComponent = DynamicUIMaterialDynamicComponent;
var _a;

//# sourceMappingURL=dynamic-ui-material-dynamic.component.js.map
