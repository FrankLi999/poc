"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.equals = function (value) {
        var comparables = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            comparables[_i - 1] = arguments[_i];
        }
        return !!(comparables.find(function (comparable) { return value === comparable; }));
    };
    Utils.isBoolean = function (value) {
        return typeof value === "boolean";
    };
    Utils.isDefined = function (value) {
        return value !== undefined && value !== null;
    };
    Utils.isFunction = function (value) {
        return typeof value === "function";
    };
    Utils.isNumber = function (value) {
        return typeof value === "number";
    };
    Utils.isObject = function (value) {
        return typeof value === "object";
    };
    Utils.isTrueObject = function (value) {
        return Utils.isDefined(value) && Utils.isObject(value);
    };
    Utils.isNonEmptyObject = function (value) {
        return Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length > 0;
    };
    Utils.isString = function (value) {
        return typeof value === "string";
    };
    Utils.isEmptyString = function (value) {
        return !Utils.isString(value) || value.length === 0;
    };
    Utils.maskToString = function (mask) {
        if (Utils.isString(mask)) {
            return mask;
        }
        else if (mask instanceof RegExp) {
            return mask.toString();
        }
        else if (Array.isArray(mask)) {
            return mask.map(function (value) { return Utils.maskToString(value); });
        }
    };
    Utils.maskFromString = function (mask) {
        if (Utils.isString(mask)) {
            var isRegExp = mask.startsWith("/") && mask.endsWith("/");
            return isRegExp ? new RegExp(mask.slice(1, mask.length - 1)) : mask;
        }
        else if (Array.isArray(mask)) {
            return mask.map(function (value) { return Utils.maskFromString(value); });
        }
    };
    Utils.merge = function (baseValue, defaultValue) {
        if (!Utils.isDefined(baseValue)) {
            return defaultValue;
        }
        if (Utils.isObject(baseValue)) {
            for (var property in baseValue) {
                if (baseValue.hasOwnProperty(property) && Utils.isObject(baseValue[property])) {
                    baseValue[property] = Utils.merge(baseValue[property], defaultValue ? defaultValue[property] : null);
                }
            }
            return defaultValue ? Object.assign(defaultValue, baseValue) : baseValue;
        }
        return baseValue;
    };
    Utils.parseJSONReviver = function (key, value) {
        var regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        return Utils.isString(value) && regexDateISO.test(value) ? new Date(value) : value;
    };
    Utils.log = function (msg) {
        console.log('%c' + msg, 'color: lightgray');
    };
    Utils.warn = function (msg) {
        console.log(msg);
    };
    Utils.err = function (msg) {
        console.log('%c' + msg, 'color: darkred');
    };
    /**
     * access object properties by dot notation or bracket notation
     *
     * @param obj
     * @param prop
     * @param newVal
     */
    Utils.val = function (obj, prop, newVal) {
        var _this = this;
        if (!prop || obj.constructor !== Object) {
            return undefined;
        }
        // TODO: convert bracket notation to dot notation. Specially, property name with dots or brackets.
        if (prop.indexOf('[') >= 0) {
            prop = prop.replace(/\[/g, '.').replace(/[\]"]/g, '');
        }
        return prop.split('.').reduce(function (o, k, i, a) {
            if (o === undefined) {
                _this.warn('The property ' + a.join('.') + ' not found!');
                return o;
            }
            if (i === a.length - 1 && newVal !== undefined) {
                // reach last prop key (dot notation)
                if (o[k] && o[k].constructor !== newVal.constructor) {
                    Utils.err('object type mismatched! (' + k + ')');
                }
                else {
                    o[k] = newVal;
                }
            }
            else if (o[k] === undefined && newVal !== undefined) {
                // rebuild the object structure
                o[k] = {};
            }
            return o[k];
        }, obj);
    };
    return Utils;
}());
exports.Utils = Utils;

//# sourceMappingURL=core.utils.js.map
