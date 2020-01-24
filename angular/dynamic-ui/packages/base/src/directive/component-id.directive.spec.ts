import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentIdDirective } from "./component-id.directive";

@Component({
    template: `
        <div [componentId]="false"></div>
        <div [componentId]="'testId'"></div>
    `
})
class TestComponent {
}

describe("ComponentIdDirective test suite", () => {

    let fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({

            declarations: [ComponentIdDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(ComponentIdDirective));
    });


    it("should have two directives", () => {

        expect(directives.length).toBe(2);
    });

    it("should have one set id", () => {

        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual("testId");
    });
});
