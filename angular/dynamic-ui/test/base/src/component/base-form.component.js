"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_form_control_component_1 = require("./base-form-control.component");
var BaseFormComponent = (function () {
    function BaseFormComponent() {
        this.type = 'form';
    }
    BaseFormComponent.prototype.trackByFn = function (_index, model) {
        return model.key;
    };
    BaseFormComponent.prototype.onEvent = function ($event, type) {
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
    return BaseFormComponent;
}());
exports.BaseFormComponent = BaseFormComponent;

//# sourceMappingURL=base-form.component.js.map
