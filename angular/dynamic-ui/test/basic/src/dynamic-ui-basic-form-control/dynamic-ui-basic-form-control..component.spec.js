"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var angular2_text_mask_1 = require("angular2-text-mask");
var base_1 = require("../../base");
var dynamic_ui_basic_form_control_component_1 = require("./dynamic-ui-basic-form-control.component");
describe("DynamicUIBasicFormControlComponent test suite", function () {
    var formGroup, fixture, component, debugElement, testElement, testModel = null;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.ReactiveFormsModule, angular2_text_mask_1.TextMaskModule, base_1.DynamicUIBaseModule.forRoot()],
            declarations: [dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent]
        }).compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));
    beforeEach(testing_1.inject([core_1.ChangeDetectorRef, base_1.DynamicUIFormValidationService], function (changeDetectorRef, service) {
        formGroup = null; //service.createFormGroup(formModel);
        component.group = formGroup;
        component.model = testModel;
        component.ngOnChanges({
            group: new core_1.SimpleChange(null, component.group, true),
            model: new core_1.SimpleChange(null, component.model, true)
        });
        fixture.detectChanges();
        testElement = debugElement.query(platform_browser_1.By.css("input[id='" + testModel.key + "']"));
    }));
    it("should initialize correctly", function () {
        expect(component.context).toBeNull();
        expect(component.control instanceof forms_1.FormControl).toBe(true);
        expect(component.group instanceof forms_1.FormGroup).toBe(true);
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
        expect(component.type).toEqual(4 /* Input */);
    });
    it("should have an input element", function () {
        expect(testElement instanceof core_1.DebugElement).toBe(true);
    });
    it("should listen to native focus and blur events", function () {
        spyOn(component, "onFocusChange");
        testElement.triggerEventHandler("focus", null);
        testElement.triggerEventHandler("blur", null);
        expect(component.onFocusChange).toHaveBeenCalledTimes(2);
    });
    it("should listen to native change event", function () {
        spyOn(component, "onValueChange");
        testElement.triggerEventHandler("change", null);
        expect(component.onValueChange).toHaveBeenCalled();
    });
    it("should update model value when control value changes", function () {
        spyOn(component, "onControlValueChanges");
        component.control.setValue("test");
        // expect(component.onControlValueChanges).toHaveBeenCalled();
    });
    it("should update control value when model value changes", function () {
        spyOn(component, "onModelValueUpdates");
        // testModel.valueUpdates.next("test");
        // expect(component.onModelValueUpdates).toHaveBeenCalled();
    });
    it("should update control activation when model disabled property changes", function () {
        spyOn(component, "onModelDisabledUpdates");
        testModel.disabledUpdates.next(true);
        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
});

//# sourceMappingURL=dynamic-ui-basic-form-control..component.spec.js.map
