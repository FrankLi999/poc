"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_utils_1 = require("../utils/core.utils");
var BaseComponent = (function () {
    function BaseComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.nestedTemplates = null;
    }
    BaseComponent.prototype.ngOnChanges = function (changes) {
        if (changes["model"]) {
            this.setupControl();
        }
    };
    BaseComponent.prototype.ngOnInit = function () {
        if (!core_utils_1.Utils.isDefined(this.model)) {
            throw new Error("no [model] input set for DynamicUIFormControlComponent");
        }
    };
    BaseComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.setTemplates(); }, 0); // setTimeout to trigger change detection
        this.changeDetectorRef.detectChanges();
    };
    BaseComponent.prototype.ngOnDestroy = function () {
    };
    BaseComponent.prototype.setupControl = function () {
    };
    Object.defineProperty(BaseComponent.prototype, "templates", {
        get: function () {
            return this.nestedTemplates ? this.nestedTemplates : this.contentTemplates;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.setTemplates = function () {
        var _this = this;
        this.templates.forEach(function (template) {
            if (template.as === null && (template.modelType === _this.model.type || template.modelId === _this.getModelId())) {
                _this.template = template;
            }
        });
    };
    BaseComponent.prototype.getModelId = function () {
        return this.model.key;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;

//# sourceMappingURL=base.component.js.map
