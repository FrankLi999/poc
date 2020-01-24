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
Object.defineProperty(exports, "__esModule", { value: true });
var base_form_composite_component_1 = require("./base-form-composite.component");
var BaseFormGroupComponent = (function (_super) {
    __extends(BaseFormGroupComponent, _super);
    function BaseFormGroupComponent(changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef, validationService) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this.type = 'group';
        return _this;
    }
    BaseFormGroupComponent.prototype.ngOnChanges = function (changes) {
        if (changes["group"] || changes["model"]) {
            this.setupControl();
        }
    };
    BaseFormGroupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.setTemplates(); }, 0);
    };
    BaseFormGroupComponent.prototype.setupControl = function () {
        // if (this.model) {
        //     if (this.group) {
        //         this.control = this.group.get(this.getModelId()) as FormControl;
        //     }
        // }
    };
    Object.defineProperty(BaseFormGroupComponent.prototype, "templates", {
        get: function () {
            return this.nestedTemplates ? this.nestedTemplates : this.contentTemplates;
        },
        enumerable: true,
        configurable: true
    });
    BaseFormGroupComponent.prototype.setTemplates = function () {
        var _this = this;
        this.templates.forEach(function (template) {
            if (template.as === null && (template.modelType === 'group' || template.modelId === _this.getModelId())) {
                _this.template = template;
            }
        });
    };
    BaseFormGroupComponent.prototype.getModelId = function () {
        return this.model.key;
    };
    return BaseFormGroupComponent;
}(base_form_composite_component_1.BaseFormCompositeComponent));
exports.BaseFormGroupComponent = BaseFormGroupComponent;

//# sourceMappingURL=base-form-group.component.js.map
