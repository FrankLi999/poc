"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_utils_1 = require("./core.utils");
describe("Core Utils test suite", function () {
    var configObject;
    beforeEach(function () {
        configObject = {
            a: 5,
            b: true,
            c: "test",
            d: {
                prop1: 2
            },
            e: {
                prop1: 1,
                prop2: {
                    nested1: 42
                }
            }
        };
    });
    it("should detect equality correctly", function () {
        var testValue1 = "test", testValue2 = 5, comparables1 = ["test1", "test2", "test3"], comparables2 = ["test1", "test2", "test"], comparables3 = [1, 2, 3, 4], comparables4 = [2, 3, 4, 5, 6];
        expect(core_utils_1.Utils.equals.apply(core_utils_1.Utils, [testValue1].concat(comparables1))).toBe(false);
        expect(core_utils_1.Utils.equals.apply(core_utils_1.Utils, [testValue1].concat(comparables2))).toBe(true);
        expect(core_utils_1.Utils.equals.apply(core_utils_1.Utils, [testValue2].concat(comparables3))).toBe(false);
        expect(core_utils_1.Utils.equals.apply(core_utils_1.Utils, [testValue2].concat(comparables4))).toBe(true);
    });
    it("should merge correctly", function () {
        var valueA = core_utils_1.Utils.merge(configObject.a, 4), valueB = core_utils_1.Utils.merge(configObject.b, false), valueC = core_utils_1.Utils.merge(configObject.c, null), valueD1 = core_utils_1.Utils.merge(configObject.d, { prop1: 1 }), valueD2 = core_utils_1.Utils.merge(configObject.d, { prop2: 3 }), valueE = core_utils_1.Utils.merge(configObject.e, null);
        var valueY = core_utils_1.Utils.merge(configObject.y, false), valueZ = core_utils_1.Utils.merge(configObject.z, null);
        expect(valueA).toBe(5);
        expect(valueB).toBe(true);
        expect(valueC).toEqual("test");
        expect(valueD1.prop1).toBe(2);
        expect(valueD2.prop1).toBe(2);
        expect(valueD2.prop2).toBe(3);
        expect(valueE.prop1).toBe(1);
        expect(valueY).toBe(false);
        expect(valueZ).toBeNull();
    });
    it("should merge recursively correctly", function () {
        var valueE = core_utils_1.Utils.merge(configObject.e, {
            prop1: 10,
            prop2: {
                nested1: 21,
                nested2: 84
            },
            prop3: 100
        });
        expect(valueE.prop1).toBe(1);
        expect(valueE.prop2).toBeDefined();
        expect(valueE.prop2.nested1).toBe(42);
        expect(valueE.prop2.nested2).toBeDefined();
        expect(valueE.prop2.nested2).toBe(84);
        expect(valueE.prop3).toBeDefined();
        expect(valueE.prop3).toBe(100);
    });
    it("should detect empty strings correctly", function () {
        var testString0 = undefined, testString1 = "", testString2 = "test string";
        expect(core_utils_1.Utils.isEmptyString(testString0)).toBe(true);
        expect(core_utils_1.Utils.isEmptyString(testString1)).toBe(true);
        expect(core_utils_1.Utils.isEmptyString(testString2)).toBe(false);
    });
    it("should detect a number correctly", function () {
        var testNumber0 = undefined, testNumber1 = 0, testNumber2 = 42;
        expect(core_utils_1.Utils.isNumber(testNumber0)).toBe(false);
        expect(core_utils_1.Utils.isNumber(testNumber1)).toBe(true);
        expect(core_utils_1.Utils.isNumber(testNumber2)).toBe(true);
    });
    it("should detect a true, non-null object correctly", function () {
        var testObject1 = {}, testObject2 = null;
        expect(core_utils_1.Utils.isTrueObject(testObject1)).toBe(true);
        expect(core_utils_1.Utils.isTrueObject(testObject2)).toBe(false);
    });
    it("should detect a non-empty object correctly", function () {
        var testObject1 = {}, testObject2 = null, testObject3 = { "test": 42 };
        expect(core_utils_1.Utils.isNonEmptyObject(testObject1)).toBe(false);
        expect(core_utils_1.Utils.isNonEmptyObject(testObject2)).toBe(false);
        expect(core_utils_1.Utils.isNonEmptyObject(testObject3)).toBe(true);
    });
    it("should convert a text mask to string correctly", function () {
        var testValue1 = "test", testValue2 = /[1-9]/, testValue3 = [testValue1, testValue2], testResult3 = core_utils_1.Utils.maskToString(testValue3);
        expect(core_utils_1.Utils.maskToString(testValue1)).toEqual(testValue1);
        expect(core_utils_1.Utils.maskToString(testValue2)).toEqual(testValue2.toString());
        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());
    });
    it("should recreate a text mask from string correctly", function () {
        var testValue1 = "test", testValue2 = "/[1-9]/", testValue3 = [testValue1, testValue2], testResult3 = core_utils_1.Utils.maskFromString(testValue3);
        expect(core_utils_1.Utils.maskFromString(testValue1)).toEqual(testValue1);
        expect(core_utils_1.Utils.maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));
        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));
    });
});

//# sourceMappingURL=core.utils.spec.js.map
