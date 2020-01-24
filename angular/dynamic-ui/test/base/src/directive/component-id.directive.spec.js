"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var component_id_directive_1 = require("./component-id.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        template: "\n        <div [componentId]=\"false\"></div>\n        <div [componentId]=\"'testId'\"></div>\n    "
    })
], TestComponent);
describe("ComponentIdDirective test suite", function () {
    var fixture, directives;
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [component_id_directive_1.ComponentIdDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges();
        directives = fixture.debugElement.queryAll(platform_browser_1.By.directive(component_id_directive_1.ComponentIdDirective));
    });
    it("should have two directives", function () {
        expect(directives.length).toBe(2);
    });
    it("should have one set id", function () {
        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual("testId");
    });
});

//# sourceMappingURL=component-id.directive.spec.js.map
