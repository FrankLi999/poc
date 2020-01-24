"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_utils_1 = require("./validation.utils");
describe("Validation Utils test suite", function () {
    it("should detect a validator configuration correctly", function () {
        var testConfig1 = { name: "test" }, testConfig2 = { args: null }, testConfig3 = { name: "test", args: null }, testConfig4 = null;
        expect(validation_utils_1.ValidationUtils.isExpandedValidatorConfig(testConfig1)).toBe(false);
        expect(validation_utils_1.ValidationUtils.isExpandedValidatorConfig(testConfig2)).toBe(false);
        expect(validation_utils_1.ValidationUtils.isExpandedValidatorConfig(testConfig3)).toBe(true);
        expect(validation_utils_1.ValidationUtils.isExpandedValidatorConfig(testConfig4)).toBe(false);
    });
});

//# sourceMappingURL=validation.utils.spec.js.map
