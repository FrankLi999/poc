import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentTemplateDirective, COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END } from "./component-template.directive";

@Component({
    template: `
        <ng-template modelId="test1"></ng-template>
        <ng-template modelId="test2" as="test"></ng-template>
    `
})
class TestComponent {
}

describe("ComponentTemplateDirective test suite", () => {

    let directive:ComponentTemplateDirective,
        fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        directive = new ComponentTemplateDirective(null);

        fixture = TestBed.configureTestingModule({

            declarations: [ComponentTemplateDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(ComponentTemplateDirective));
    });

    it("should be initialized correctly", () => {

        expect(directive.align).toEqual(COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});