import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange, ChangeDetectorRef } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { TextMaskModule } from "angular2-text-mask";
import {
    ComponentModel,
    DynamicUIBaseModule,
    DynamicUIFormValidationService
} from "../../base";
import { DynamicUIBasicFormControlType, DynamicUIBasicFormControlComponent } from "./dynamic-ui-basic-form-control.component";

describe("DynamicUIBasicFormControlComponent test suite", () => {

  let
    formGroup: FormGroup,
    fixture: ComponentFixture<DynamicUIBasicFormControlComponent>,
    component: DynamicUIBasicFormControlComponent,
    debugElement: DebugElement,
    testElement: DebugElement,
    testModel: ComponentModel = null;
    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [ReactiveFormsModule, TextMaskModule, DynamicUIBaseModule.forRoot()],
            declarations: [DynamicUIBasicFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(DynamicUIBasicFormControlComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([ChangeDetectorRef, DynamicUIFormValidationService], (changeDetectorRef: ChangeDetectorRef, service: DynamicUIFormValidationService) => {

        formGroup = null;//service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        component.ngOnChanges({

            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${testModel.key}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        // expect(component.model instanceof ComponentModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);

        // expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        // expect(component.onModelValueUpdates).toBeDefined();

        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();

        expect(component.onValueChange).toBeDefined();
        expect(component.onFocusChange).toBeDefined();

        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.showErrorMessages).toBe(false);

        expect(component.type).toEqual(DynamicUIBasicFormControlType.Input);
    });

    it("should have an input element", () => {

        expect(testElement instanceof DebugElement).toBe(true);
    });

    it("should listen to native focus and blur events", () => {

        spyOn(component, "onFocusChange");

        testElement.triggerEventHandler("focus", null);
        testElement.triggerEventHandler("blur", null);

        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });

    it("should listen to native change event", () => {

        spyOn(component, "onValueChange");

        testElement.triggerEventHandler("change", null);

        expect(component.onValueChange).toHaveBeenCalled();
    });

    it("should update model value when control value changes", () => {

        spyOn(component, "onControlValueChanges");

        component.control.setValue("test");

        // expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        // testModel.valueUpdates.next("test");

        // expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
});
