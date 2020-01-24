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
var form_model_1 = require("../model/form/form.model");
var core_utils_1 = require("../utils/core.utils");
var base_component_1 = require("./base.component");
var BaseFormControlEventType;
(function (BaseFormControlEventType) {
    BaseFormControlEventType[BaseFormControlEventType["Blur"] = 1] = "Blur";
    BaseFormControlEventType[BaseFormControlEventType["Change"] = 2] = "Change";
    BaseFormControlEventType[BaseFormControlEventType["Focus"] = 3] = "Focus";
    BaseFormControlEventType[BaseFormControlEventType["Custom"] = 4] = "Custom";
})(BaseFormControlEventType = exports.BaseFormControlEventType || (exports.BaseFormControlEventType = {}));
var BaseFormControlComponent = (function (_super) {
    __extends(BaseFormControlComponent, _super);
    function BaseFormControlComponent(changeDetectorRef, validationService) {
        var _this = _super.call(this, changeDetectorRef) || this;
        _this.changeDetectorRef = changeDetectorRef;
        _this.validationService = validationService;
        _this.hasErrorMessaging = false;
        _this.subscriptions = [];
        return _this;
    }
    BaseFormControlComponent.prototype.ngOnChanges = function (changes) {
        if (changes["model"] || changes["group"]) {
            this.setupControl();
        }
    };
    BaseFormControlComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!core_utils_1.Utils.isDefined(this.group)) {
            throw new Error("no [group] input set for DynamicUIFormControlComponent");
        }
    };
    BaseFormControlComponent.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
    };
    BaseFormControlComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.unsubscribe();
    };
    BaseFormControlComponent.prototype.setupControl = function () {
        _super.prototype.setupControl.call(this);
        if (this.model) {
            this.unsubscribe();
            if (this.model.relation && this.model.relation.length > 0) {
                this.setControlRelations();
            }
        }
    };
    Object.defineProperty(BaseFormControlComponent.prototype, "errorMessages", {
        get: function () {
            if (this.hasErrorMessaging && this.model.hasErrorMessages) {
                // TODO
                return [];
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormControlComponent.prototype, "hasHint", {
        get: function () {
            // TODO
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormControlComponent.prototype, "hasList", {
        get: function () {
            // TODO
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormControlComponent.prototype, "isInvalid", {
        get: function () {
            return this.control.touched && this.control.invalid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormControlComponent.prototype, "isValid", {
        get: function () {
            return this.control.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormControlComponent.prototype, "showErrorMessages", {
        get: function () {
            return this.control.touched && !this.hasFocus && this.isInvalid;
        },
        enumerable: true,
        configurable: true
    });
    BaseFormControlComponent.prototype.setControlRelations = function () {
        //TODO
    };
    BaseFormControlComponent.prototype.unsubscribe = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        this.subscriptions = [];
    };
    BaseFormControlComponent.prototype.onModelDisabledUpdates = function (value) {
        value ? this.control.disable() : this.control.enable();
    };
    BaseFormControlComponent.prototype.onFilterChange = function ($event) {
        // TODO
    };
    BaseFormControlComponent.prototype.onValueChange = function ($event) {
        if ($event && $event instanceof Event) {
            if (this.model.type === form_model_1.DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD) {
                var model = this.model;
                if (model.inputType === form_model_1.DYNAMIC_UI_COMPONENT_TYPE_FILE) {
                    var inputElement = $event.target || $event.srcElement;
                    model.files = inputElement.files;
                }
            }
            this.change.emit(this.createEvent($event, "change"));
        }
        else if ($event && $event.hasOwnProperty("$event")) {
            this.change.emit($event);
        }
        else {
            this.change.emit(this.createEvent($event, "change"));
        }
    };
    BaseFormControlComponent.prototype.onBlur = function ($event) {
        if ($event && $event.hasOwnProperty("$event")) {
            this.blur.emit($event);
        }
        else {
            this.hasFocus = false;
            this.blur.emit(this.createEvent($event, "blur"));
        }
    };
    BaseFormControlComponent.prototype.onFocus = function ($event) {
        if ($event && $event.hasOwnProperty("$event")) {
            this.focus.emit($event);
        }
        else {
            this.hasFocus = true;
            this.focus.emit(this.createEvent($event, "focus"));
        }
    };
    BaseFormControlComponent.prototype.onCustomEvent = function ($event, type) {
        if (type === void 0) { type = null; }
        if ($event && $event.hasOwnProperty("$event") && $event.hasOwnProperty("type")) {
            this.customEvent.emit($event);
        }
        else {
            this.customEvent.emit(this.createEvent($event, type));
        }
    };
    BaseFormControlComponent.prototype.createEvent = function ($event, type) {
        return { $event: $event, context: this.context, control: this.control, group: this.group, model: this.model, type: type };
    };
    return BaseFormControlComponent;
}(base_component_1.BaseComponent));
exports.BaseFormControlComponent = BaseFormControlComponent;

//# sourceMappingURL=base-form-control.component.js.map
