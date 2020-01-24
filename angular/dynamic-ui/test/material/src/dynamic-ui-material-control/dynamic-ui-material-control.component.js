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
var dynamic_ui_material_form_control_component_1 = require("../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component");
var dynamic_ui_material_model_1 = require("../dynamic-ui-material.model");
var DynamicUIMaterialControlComponent = (function (_super) {
    __extends(DynamicUIMaterialControlComponent, _super);
    function DynamicUIMaterialControlComponent(viewContainerRef, cfr, changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.viewContainerRef = viewContainerRef;
        _this.cfr = cfr;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this.componentId = true;
        _this.context = null;
        _this.hasErrorMessaging = false;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        _this.type = 'dynamic-control';
        return _this;
    }
    DynamicUIMaterialControlComponent.prototype.ngOnInit = function () {
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
            vc.hasErrorMessaging = this.hasErrorMessaging;
            vc.model = this.model;
            vc.nestedTemplates = this.nestedTemplates;
            vc.blur = this.blur;
            vc.change = this.change;
            vc.focus = this.focus;
            vc.showCharacterHint = this.showCharacterHint;
            vc.setupControl();
        }
        catch (ex) {
            // if(ex === NoComponentFactoryError) {
            this.htmlTemplate = ex.toString();
            // }
            base_1.Utils.err(ex);
        }
    };
    DynamicUIMaterialControlComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.componentRef.instance.contentTemplates = _this.contentTemplates;
            _this.componentRef.instance.setTemplates();
        }, 0); // setTimeout to trigger change detection
    };
    DynamicUIMaterialControlComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.componentRef.destroy();
    };
    return DynamicUIMaterialControlComponent;
}(base_1.BaseFormControlComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIMaterialControlComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIMaterialControlComponent.prototype, "context", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIMaterialControlComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIMaterialControlComponent.prototype, "hasErrorMessaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_b = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _b || Object)
], DynamicUIMaterialControlComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialControlComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIMaterialControlComponent.prototype, "showCharacterHint", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialControlComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialControlComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialControlComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialControlComponent.prototype, "contentTemplates", void 0);
DynamicUIMaterialControlComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-ui-material-control',
        template: "{{htmlTemplate}}"
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef, typeof (_c = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _c || Object])
], DynamicUIMaterialControlComponent);
exports.DynamicUIMaterialControlComponent = DynamicUIMaterialControlComponent;
var _a, _b, _c;

//# sourceMappingURL=dynamic-ui-material-control.component.js.map
