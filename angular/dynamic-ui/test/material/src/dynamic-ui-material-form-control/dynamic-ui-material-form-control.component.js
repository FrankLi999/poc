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
var material_1 = require("@angular/material");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_material_form_const_1 = require("../dynamic-ui-material-form.const");
var DynamicUIMaterialFormControlComponent = DynamicUIMaterialFormControlComponent_1 = (function (_super) {
    __extends(DynamicUIMaterialFormControlComponent, _super);
    function DynamicUIMaterialFormControlComponent(changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this._showCharacterCount = false;
        _this.componentId = true;
        _this.context = null;
        _this.hasErrorMessaging = false;
        _this.blur = new core_1.EventEmitter();
        _this.change = new core_1.EventEmitter();
        _this.focus = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(DynamicUIMaterialFormControlComponent.prototype, "showCharacterHint", {
        get: function () {
            return !!(this._showCharacterCount && this.model.maxLength && this.characterCount);
        },
        set: function (value) {
            this._showCharacterCount = value;
        },
        enumerable: true,
        configurable: true
    });
    DynamicUIMaterialFormControlComponent.getFormControlType = function (model) {
        switch (model.type) {
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_DATAGRID:
                return 1 /* Array */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_COLUMNS:
                return 11 /* Columns */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX:
                return 2 /* Checkbox */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP:
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_GROUP:
                return 4 /* Group */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_DATETIME:
                return 3 /* DatePicker */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD:
                return 5 /* Input */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP:
                return 6 /* RadioGroup */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SELECT:
                return 7 /* Select */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SLIDER:
                return 8 /* Slider */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_SWITCH:
                return 9 /* SlideToggle */;
            case base_1.DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA:
                return 10 /* TextArea */;
            default:
                return null;
        }
    };
    DynamicUIMaterialFormControlComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes["model"]) {
            this.type = DynamicUIMaterialFormControlComponent_1.getFormControlType(this.model);
        }
    };
    Object.defineProperty(DynamicUIMaterialFormControlComponent.prototype, "characterCount", {
        get: function () {
            if (this.matViewChild instanceof material_1.MatFormField) {
                //return (this.matViewChild as MatFormField)._matInputChild.value.length;
                return this.matViewChild._control.value.length;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return DynamicUIMaterialFormControlComponent;
}(base_1.BaseFormControlComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIMaterialFormControlComponent.prototype, "componentId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _a || Object)
], DynamicUIMaterialFormControlComponent.prototype, "context", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DynamicUIMaterialFormControlComponent.prototype, "group", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DynamicUIMaterialFormControlComponent.prototype, "hasErrorMessaging", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_b = typeof base_1.ComponentModel !== "undefined" && base_1.ComponentModel) === "function" && _b || Object)
], DynamicUIMaterialFormControlComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialFormControlComponent.prototype, "nestedTemplates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DynamicUIMaterialFormControlComponent.prototype, "showCharacterHint", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialFormControlComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialFormControlComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicUIMaterialFormControlComponent.prototype, "focus", void 0);
__decorate([
    core_1.ContentChildren(base_1.ComponentTemplateDirective),
    __metadata("design:type", core_1.QueryList)
], DynamicUIMaterialFormControlComponent.prototype, "contentTemplates", void 0);
__decorate([
    core_1.ViewChild(dynamic_ui_material_form_const_1.MAT_VIEW_CHILD_SELECTOR),
    __metadata("design:type", Object)
], DynamicUIMaterialFormControlComponent.prototype, "matViewChild", void 0);
DynamicUIMaterialFormControlComponent = DynamicUIMaterialFormControlComponent_1 = __decorate([
    core_1.Component({
        selector: "dynamic-ui-material-form-control",
        templateUrl: "./dynamic-ui-material-form-control.component.html"
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, typeof (_c = typeof base_1.DynamicUIFormValidationService !== "undefined" && base_1.DynamicUIFormValidationService) === "function" && _c || Object])
], DynamicUIMaterialFormControlComponent);
exports.DynamicUIMaterialFormControlComponent = DynamicUIMaterialFormControlComponent;
var DynamicUIMaterialFormControlComponent_1, _a, _b, _c;

//# sourceMappingURL=dynamic-ui-material-form-control.component.js.map
