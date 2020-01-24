import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { FormioIdDirective } from "./formio-id.directive";

@Component({
    template: `
        <div [formioId]="false"></div>
        <div [formioId]="'testId'"></div>
    `
})
class TestComponent {
}

describe("FormioIdDirective test suite", () => {

    let fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({

            declarations: [FormioIdDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(FormioIdDirective));
    });


    it("should have two directives", () => {

        expect(directives.length).toBe(2);
    });

    it("should have one set id", () => {

        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual("testId");
    });
});