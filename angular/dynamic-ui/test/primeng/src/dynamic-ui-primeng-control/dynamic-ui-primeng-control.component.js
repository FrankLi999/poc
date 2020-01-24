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
var dynamic_ui_primeng_form_control_component_1 = require("../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_primeng_model_1 = require("../dynamic-ui-primeng.model");
var DynamicUIPrimengControlComponent = (function () {
    function DynamicUIPrimengControlComponent(viewContainerRef, cfr) {
        this.viewContainerRef = viewContainerRef;
        this.cfr = cfr;
        this.componentId = true;
        this.context = null;
        this.hasErrorMessaging = false;
        this.blur = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.htmlTemplate = '';
    }
    DynamicUIPrimengControlComponent.prototype.ngOnInit = function () {
        var type = dynamic_ui_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent.getFormControlType(this.model);
        try {
            var typ = dynamic_ui_primeng_model_1.PrimengComponentTypes[type];
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
            vc.setupControl();
        }
        catch (ex) {
            // if(ex === NoComponentFactoryError) {
            this.htmlTemplate = ex.toString();
            // }
            base_1.Utils.err(ex);
        }
    };
    DynamicUIPrimengControlComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.componentRef.instance.contentTemplates = _this.contentTemplates;
            _this.componentRef.instance.setTemplates();
        }, 0); // setTimeout to trigger change detection
    };
    DynamicUIPrimengControlComponent.prototype.ngOnDestroy = function () {
        this.componentRef.destroy();
    };
    DynamicUIPrimengControlComponent.prototype.onEvent = function () {
    };
    return DynamicUIPrimengControlComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIPrimengControlComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIPrimengControlComponent.prototype, "context", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIPrimengControlComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIPrimengControlComponent.prototype, "hasErrorMessaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_b = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _b || Object)
], DynamicUIPrimengControlComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengControlComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengControlComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengControlComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengControlComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengControlComponent.prototype, "contentTemplates", void 0);
DynamicUIPrimengControlComponent = __decorate([
    core_1.Component({
        selector: 'dynamic-ui-primeng-control',
        template: "{{htmlTemplate}}"
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver])
], DynamicUIPrimengControlComponent);
exports.DynamicUIPrimengControlComponent = DynamicUIPrimengControlComponent;
var _a, _b;

//# sourceMappingURL=dynamic-ui-primeng-control.component.js.map
