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
var primeng_1 = require("primeng/primeng");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_primeng_form_const_1 = require("../dynamic-ui-primeng-form.const");
var DynamicUIPrimengFormControlComponent = DynamicUIPrimengFormControlComponent_1 = (function (_super) {
    __extends(DynamicUIPrimengFormControlComponent, _super);
    function DynamicUIPrimengFormControlComponent(changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this.componentId = true;
        _this.context = null;
        _this.hasErrorMessaging = false;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        return _this;
    }
    DynamicUIPrimengFormControlComponent.getFormControlType = function (model) {
        switch (model.type) {
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_DATAGRID:
                return 1 /* Array */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_COLUMNS:
                return 16 /* Columns */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX:
                return 4 /* Checkbox */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP:
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_GROUP:
                return 8 /* Group */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_DATETIME:
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_TIME:
                return 3 /* Calendar */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_EDITOR:
                return 7 /* Editor */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD:
                var inputModel = model;
                if (inputModel.list) {
                    return 2 /* AutoComplete */;
                }
                else if (inputModel.multiple) {
                    return 5 /* Chips */;
                }
                else {
                    return 9 /* Input */;
                }
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP:
                return 12 /* RadioGroup */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_RATING:
                return 13 /* Rating */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SELECT:
                return model.multiple ? 11 /* MultiSelect */ : 6 /* Dropdown */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SLIDER:
                return 14 /* Slider */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SWITCH:
                return 10 /* InputSwitch */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA:
                return 15 /* TextArea */;
            default:
                return null;
        }
    };
    DynamicUIPrimengFormControlComponent.getTemplateDirectives = function (component) {
        switch (component.constructor) {
            case primeng_1.AutoComplete:
                return dynamic_ui_primeng_form_const_1.PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;
            case primeng_1.Chips:
                return dynamic_ui_primeng_form_const_1.PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES;
            case primeng_1.Dropdown:
                return dynamic_ui_primeng_form_const_1.PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;
            default:
                return null;
        }
    };
    DynamicUIPrimengFormControlComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes["model"]) {
            this.type = DynamicUIPrimengFormControlComponent_1.getFormControlType(this.model);
        }
    };
    DynamicUIPrimengFormControlComponent.prototype.setTemplateDirective = function (directive) {
        var _this = this;
        if (this.pViewChild) {
            var templateDirectives_1 = DynamicUIPrimengFormControlComponent_1.getTemplateDirectives(this.pViewChild);
            Object.keys(templateDirectives_1 || {}).forEach(function (key) {
                if (templateDirectives_1[key] === directive.as) {
                    _this.pViewChild[key] = directive.templateRef;
                }
            });
        }
    };
    DynamicUIPrimengFormControlComponent.prototype.setTemplates = function () {
        var _this = this;
        _super.prototype.setTemplates.call(this);
        this.templates
            .filter(function (directive) { return base_1.Utils.isString(directive.as); })
            .forEach(function (directive) { return _this.setTemplateDirective(directive); });
    };
    DynamicUIPrimengFormControlComponent.prototype.onAutoComplete = function ($event) {
        this.suggestions = this.model.list.map(function (item) { return item; });
    };
    return DynamicUIPrimengFormControlComponent;
}(base_1.BaseFormControlComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIPrimengFormControlComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIPrimengFormControlComponent.prototype, "context", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIPrimengFormControlComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIPrimengFormControlComponent.prototype, "hasErrorMessaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_b = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _b || Object)
], DynamicUIPrimengFormControlComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormControlComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormControlComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormControlComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIPrimengFormControlComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIPrimengFormControlComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChild(dynamic_ui_primeng_form_const_1.PRIME_NG_VIEW_CHILD_SELECTOR),
    __metadata("design:type", Object)
], DynamicUIPrimengFormControlComponent.prototype, "pViewChild", void 0);
DynamicUIPrimengFormControlComponent = DynamicUIPrimengFormControlComponent_1 = __decorate([
    core_1.Component({
        selector: "dynamic-ui-primeng-form-control",
        templateUrl: "./dynamic-ui-primeng-form-control.component.html"
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_c = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _c || Object])
], DynamicUIPrimengFormControlComponent);
exports.DynamicUIPrimengFormControlComponent = DynamicUIPrimengFormControlComponent;
var DynamicUIPrimengFormControlComponent_1, _a, _b, _c;

//# sourceMappingURL=dynamic-ui-primeng-form-control.component.js.map
