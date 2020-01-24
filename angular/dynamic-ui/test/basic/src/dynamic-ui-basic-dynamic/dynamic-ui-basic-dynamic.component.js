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
var dynamic_ui_basic_model_1 = require("../dynamic-ui-basic.model");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_basic_form_control_component_1 = require("../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component");
var DynamicUIBasicDynamicComponent = (function (_super) {
    __extends(DynamicUIBasicDynamicComponent, _super);
    function DynamicUIBasicDynamicComponent(viewContainerRef, cfr, changeDetectorRef) {
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
    DynamicUIBasicDynamicComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var type = dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent.getFormControlType(this.model);
        try {
            var typ = dynamic_ui_basic_model_1.DynamicUIBasicComponentTypes[type];
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
    return DynamicUIBasicDynamicComponent;
}(base_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIBasicDynamicComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIBasicDynamicComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicDynamicComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicDynamicComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicDynamicComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIBasicDynamicComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicDynamicComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChildren(dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent),
    __metadata("design:type", core_1.QueryList)
], DynamicUIBasicDynamicComponent.prototype, "components", void 0);
DynamicUIBasicDynamicComponent = __decorate([
    core_1.Component({
        selector: "dynamic-ui-basic-dynamic-component",
        template: "{{htmlTemplate}}"
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef])
], DynamicUIBasicDynamicComponent);
exports.DynamicUIBasicDynamicComponent = DynamicUIBasicDynamicComponent;
var _a;

//# sourceMappingURL=dynamic-ui-basic-dynamic.component.js.map
