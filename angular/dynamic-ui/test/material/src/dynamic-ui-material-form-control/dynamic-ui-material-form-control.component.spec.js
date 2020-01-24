"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var base_1 = require("../../base");
var material_1 = require("@angular/material");
var dynamic_ui_material_form_control_component_1 = require("./dynamic-ui-material-form-control.component");
var dynamic_ui_material_form_const_1 = require("./dynamic-ui-material-form.const");
describe("DynamicUIMaterialFormControlComponent test suite", function () {
    var formModel = null, testModel = null, formGroup, fixture, component, debugElement, testElement;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                animations_1.NoopAnimationsModule,
                material_1.MatAutocompleteModule,
                material_1.MatCheckboxModule,
                material_1.MatDatepickerModule,
                material_1.MatInputModule,
                material_1.MatRadioModule,
                material_1.MatSelectModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                base_1.DynamicUIBaseModule.forRoot()
            ],
            declarations: [dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent]
        }).compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));
    beforeEach(testing_1.inject([core_1.ChangeDetectorRef, base_1.DynamicUIFormService], function (changeRef, service) {
        formGroup = service.createForm(formModel);
        component.group = formGroup;
        component.model = testModel;
        component.showCharacterHint = false;
        component.ngOnChanges({
            group: new core_1.SimpleChange(null, component.group, true),
            model: new core_1.SimpleChange(null, component.model, true),
            showCharacterHint: new core_1.SimpleChange(null, component.showCharacterHint, true)
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
        expect(component.showCharacterHint).toBe(false);
        expect(component.characterCount).toBe(0);
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
        expect(component.type).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Input);
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
        //testModel.valueUpdates.next("test");
        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });
    it("should update control activation when model disabled property changes", function () {
        spyOn(component, "onModelDisabledUpdates");
        testModel.disabledUpdates.next(true);
        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
    it("should determine correct form control type", function () {
        var testFn = dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent.getFormControlType;
        expect(testFn(formModel[0])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Checkbox);
        expect(testFn(formModel[1])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Group);
        expect(testFn(formModel[2])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.DatePicker);
        expect(testFn(formModel[3])).toBeNull();
        expect(testFn(formModel[4])).toBeNull();
        expect(testFn(formModel[5])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Array);
        expect(testFn(formModel[6])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Group);
        expect(testFn(formModel[7])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Input);
        expect(testFn(formModel[8])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.RadioGroup);
        expect(testFn(formModel[9])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Select);
        expect(testFn(formModel[10])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.Slider);
        expect(testFn(formModel[11])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.SlideToggle);
        expect(testFn(formModel[12])).toEqual(dynamic_ui_material_form_const_1.MatFormControlType.TextArea);
        expect(testFn(formModel[13])).toBeNull();
    });
});

//# sourceMappingURL=dynamic-ui-material-form-control.component.spec.js.map
