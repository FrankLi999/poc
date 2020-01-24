import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormioTemplateDirective, FORMIO_TEMPLATE_DIRECTIVE_ALIGN_END } from "./formio-template.directive";

@Component({
    template: `
        <ng-template modelId="test1"></ng-template>
        <ng-template modelId="test2" as="test"></ng-template>
    `
})
class TestComponent {
}

describe("FormioTemplateDirective test suite", () => {

    let directive: FormioTemplateDirective,
        fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        directive = new FormioTemplateDirective(null);

        fixture = TestBed.configureTestingModule({

            declarations: [FormioTemplateDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(FormioTemplateDirective));
    });

    it("should be initialized correctly", () => {

        expect(directive.align).toEqual(FORMIO_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});