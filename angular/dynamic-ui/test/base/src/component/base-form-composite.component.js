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
var base_form_control_component_1 = require("./base-form-control.component");
var BaseFormCompositeComponent = (function (_super) {
    __extends(BaseFormCompositeComponent, _super);
    function BaseFormCompositeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'composite';
        return _this;
    }
    BaseFormCompositeComponent.prototype.trackByFn = function (_index, model) {
        return model.key;
    };
    BaseFormCompositeComponent.prototype.onEvent = function ($event, type) {
        switch (type) {
            case base_form_control_component_1.BaseFormControlEventType.Blur:
                this.blur.emit($event);
                break;
            case base_form_control_component_1.BaseFormControlEventType.Change:
                this.change.emit($event);
                break;
            case base_form_control_component_1.BaseFormControlEventType.Focus:
                this.focus.emit($event);
                break;
            case base_form_control_component_1.BaseFormControlEventType.Custom:
                this.customEvent.emit($event);
                break;
        }
    };
    return BaseFormCompositeComponent;
}(base_form_control_component_1.BaseFormControlComponent));
exports.BaseFormCompositeComponent = BaseFormCompositeComponent;

//# sourceMappingURL=base-form-composite.component.js.map
