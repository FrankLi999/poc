"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var autofill_utils_1 = require("./autofill.utils");
describe("DynamicFormAutoFillService test suite", function () {
    it("should validate autofill expressions correctly", function () {
        var value1 = "section-test shipping mobile tel", value2 = "billing section-test mobile tel", value3 = "section-test shipping tel", value4 = "section-test work given-name", value5 = "billing cc-name", value6 = "home email", value7 = "section-test shipping work", value8 = "section-test work shipping tel", value9 = "billing country", value10 = "billing country name", value11 = "billing shipping name", value12 = "section-test1 section-test2 shipping name", value13 = "section-test1 blabla name", value14 = "section-test1 blabla mobile tel";
        expect(autofill_utils_1.AutoFillUtils.validate(value1)).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.validate(value2)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value3)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value4)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value5)).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.validate(value6)).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.validate(value7)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value8)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value9)).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.validate(value10)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value11)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value12)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value13)).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.validate(value14)).toBe(false);
    });
    it("should validate address tokens correctly", function () {
        expect(autofill_utils_1.AutoFillUtils.isAddressToken("shipping")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isAddressToken("billing")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isAddressToken("home")).toBe(false);
    });
    it("should validate contact tokens correctly", function () {
        expect(autofill_utils_1.AutoFillUtils.isContactToken("home")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactToken("work")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactToken("mobile")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactToken("fax")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactToken("pager")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactToken("billing")).toBe(false);
    });
    it("should validate section tokens correctly", function () {
        expect(autofill_utils_1.AutoFillUtils.isSectionToken("section-test")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isSectionToken("section")).toBe(false);
    });
    it("should validate contact fields correctly", function () {
        expect(autofill_utils_1.AutoFillUtils.isContactField("tel")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactField("email")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactField("impp")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isContactField("name")).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.isContactField("country")).toBe(false);
    });
    it("should validate fields correctly", function () {
        expect(autofill_utils_1.AutoFillUtils.isField("street-address")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isField("nickname")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isField("organization")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isField("postal-code")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isField("country")).toBe(true);
        expect(autofill_utils_1.AutoFillUtils.isField("tel")).toBe(false);
        expect(autofill_utils_1.AutoFillUtils.isField("email")).toBe(false);
    });
});

//# sourceMappingURL=autofill.utils.spec.js.map
