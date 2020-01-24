"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_utils_1 = require("./core.utils");
var ValidationUtils = (function () {
    function ValidationUtils() {
    }
    ValidationUtils.isExpandedValidatorConfig = function (value) {
        if (core_utils_1.Utils.isTrueObject(value)) {
            return value.hasOwnProperty("name") && value.hasOwnProperty("args");
        }
        return false;
    };
    return ValidationUtils;
}());
exports.ValidationUtils = ValidationUtils;

//# sourceMappingURL=validation.utils.js.map
