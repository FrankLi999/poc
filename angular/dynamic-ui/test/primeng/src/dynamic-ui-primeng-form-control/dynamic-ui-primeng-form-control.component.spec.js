"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var primeng_1 = require("primeng/primeng");
var DynamicUI_core_1 = require("../DynamicUI-core");
var DynamicUI_primeng_form_control_component_1 = require("./DynamicUI-primeng-form-control.component");
var DynamicUI_primeng_form_const_1 = require("./DynamicUI-primeng-form.const");
describe("-primeng test suite", function () {
    var formModel = [
        new DynamicUI_core_1.DynamicUICheckboxModel({ id: "checkbox" }),
        new DynamicUI_core_1.DynamicUICheckboxGroupModel({ id: "checkboxGroup", group: [] }),
        new DynamicUI_core_1.DynamicUIDatePickerModel({ id: "datepicker" }),
        new DynamicUI_core_1.DynamicUIEditorModel({ id: "editor" }),
        new DynamicUI_core_1.DynamicUIFileUploadModel({ id: "upload", url: "" }),
        new DynamicUI_core_1.DynamicUIFormArrayModel({ id: "formArray", groupFactory: function () { return []; } }),
        new DynamicUI_core_1.DynamicUIFormGroupModel({ id: "formGroup", group: [] }),
        new DynamicUI_core_1.DynamicUIInputModel({ id: "input", maxLength: 51 }),
        new DynamicUI_core_1.DynamicUIRadioGroupModel({ id: "radioGroup" }),
        new DynamicUI_core_1.DynamicUIRatingModel({ id: "rating" }),
        new DynamicUI_core_1.DynamicUISelectModel({ id: "select", options: [{ value: "One" }, { value: "Two" }], value: "One" }),
        new DynamicUI_core_1.DynamicUISliderModel({ id: "slider" }),
        new DynamicUI_core_1.DynamicUISwitchModel({ id: "switch" }),
        new DynamicUI_core_1.DynamicUITextAreaModel({ id: "textarea" }),
        new DynamicUI_core_1.DynamicUITimePickerModel({ id: "timepicker" })
    ], testModel = formModel[7], formGroup, fixture, component, debugElement, testElement;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                forms_1.ReactiveFormsModule,
                animations_1.NoopAnimationsModule,
                DynamicUI_core_1.DynamicUIFormsCoreModule.forRoot(),
                primeng_1.AutoCompleteModule,
                primeng_1.CalendarModule,
                primeng_1.CheckboxModule,
                primeng_1.ChipsModule,
                primeng_1.DropdownModule,
                primeng_1.EditorModule,
                primeng_1.InputSwitchModule,
                primeng_1.InputTextModule,
                primeng_1.InputTextareaModule,
                primeng_1.MultiSelectModule,
                primeng_1.RadioButtonModule,
                primeng_1.RatingModule,
                primeng_1.SliderModule,
                primeng_1.SpinnerModule
            ],
            declarations: [DynamicUI_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent]
        }).compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(DynamicUI_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));
    beforeEach(testing_1.inject([DynamicUI_core_1.DynamicUINg2DynamicFormService], function (service) {
        formGroup = service.createFormGroup(formModel);
        component.group = formGroup;
        component.model = testModel;
        component.ngOnChanges({
            group: new core_1.SimpleChange(null, component.group, true),
            model: new core_1.SimpleChange(null, component.model, true)
        });
        fixture.detectChanges();
        testElement = debugElement.query(platform_browser_1.By.css("input[id='" + testModel.id + "']"));
    }));
    it("should initialize correctly", function () {
        expect(component.context).toBeNull();
        expect(component.control instanceof forms_1.FormControl).toBe(true);
        expect(component.group instanceof forms_1.FormGroup).toBe(true);
        expect(component.model instanceof DynamicUI_core_1.DynamicUIFormControlModel).toBe(true);
        expect(component.hasErrorMessaging).toBe(false);
        expect(component.onControlValueChanges).toBeDefined();
        expect(component.onModelDisabledUpdates).toBeDefined();
        expect(component.onModelValueUpdates).toBeDefined();
        expect(component.blur).toBeDefined();
        expect(component.change).toBeDefined();
        expect(component.focus).toBeDefined();
        expect(component.onValueChange).toBeDefined();
        expect(component.onFocusChange).toBeDefined();
        expect(component.isValid).toBe(true);
        expect(component.isInvalid).toBe(false);
        expect(component.type).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Input);
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
        expect(component.onControlValueChanges).toHaveBeenCalled();
    });
    it("should update control value when model value changes", function () {
        spyOn(component, "onModelValueUpdates");
        testModel.valueUpdates.next("test");
        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });
    it("should update control activation when model disabled property changes", function () {
        spyOn(component, "onModelDisabledUpdates");
        testModel.disabledUpdates.next(true);
        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });
    it("should determine correct form control type", function () {
        var testFn = DynamicUI_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent.getFormControlType;
        expect(testFn(formModel[0])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Checkbox);
        expect(testFn(formModel[1])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Group);
        expect(testFn(formModel[2])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Calendar);
        expect(testFn(formModel[3])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Editor);
        expect(testFn(formModel[4])).toBeNull();
        expect(testFn(formModel[5])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Array);
        expect(testFn(formModel[6])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Group);
        expect(testFn(formModel[7])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Input);
        formModel[7].multiple = true;
        expect(testFn(formModel[7])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Chips);
        formModel[7].list = ["test1", "test2", "test3"];
        expect(testFn(formModel[7])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.AutoComplete);
        expect(testFn(formModel[8])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.RadioGroup);
        expect(testFn(formModel[9])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Rating);
        expect(testFn(formModel[10])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Dropdown);
        formModel[10].multiple = true;
        expect(testFn(formModel[10])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.MultiSelect);
        expect(testFn(formModel[11])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Slider);
        expect(testFn(formModel[12])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.InputSwitch);
        expect(testFn(formModel[13])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.TextArea);
        expect(testFn(formModel[14])).toEqual(DynamicUI_primeng_form_const_1.PrimeNGFormControlType.Calendar);
    });
    xit("should determine correct template directives", testing_1.async(function () {
        var testFn = DynamicUI_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent.getTemplateDirectives;
        var fixture1 = testing_1.TestBed.createComponent(DynamicUI_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent), component1 = fixture1.componentInstance;
        formModel[7].list = ["test1", "test2", "test3"];
        component1.group = formGroup;
        component1.model = formModel[7];
        fixture1.detectChanges();
        expect(testFn(component1.pViewChild)).toEqual(DynamicUI_primeng_form_const_1.PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES);
    }));
});

//# sourceMappingURL=dynamic-ui-primeng-form-control.component.spec.js.map
