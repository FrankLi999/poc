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
var component_template_directive_1 = require("./component-template.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        template: "\n        <ng-template modelId=\"test1\"></ng-template>\n        <ng-template modelId=\"test2\" as=\"test\"></ng-template>\n    "
    })
], TestComponent);
describe("ComponentTemplateDirective test suite", function () {
    var directive, fixture, directives;
    beforeEach(function () {
        directive = new component_template_directive_1.ComponentTemplateDirective(null);
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [component_template_directive_1.ComponentTemplateDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges();
        directives = fixture.debugElement.queryAll(platform_browser_1.By.directive(component_template_directive_1.ComponentTemplateDirective));
    });
    it("should be initialized correctly", function () {
        expect(directive.align).toEqual(component_template_directive_1.COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});

//# sourceMappingURL=component-template.directive.spec.js.map
