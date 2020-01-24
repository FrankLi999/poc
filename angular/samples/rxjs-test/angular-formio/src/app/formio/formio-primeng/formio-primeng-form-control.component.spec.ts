import { DebugElement, SimpleChange } from "@angular/core";
import { TestBed, async, inject, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    DropdownModule,
    EditorModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    SpinnerModule
} from "primeng/primeng";
import {
    FormioFormsCoreModule,
    FormioNg2DynamicFormService,
    FormioCheckboxModel,
    FormioCheckboxGroupModel,
    FormioDatePickerModel,
    FormioEditorModel,
    FormioFileUploadModel,
    FormioFormArrayModel,
    FormioFormControlModel,
    FormioFormGroupModel,
    FormioInputModel,
    FormioRadioGroupModel,
    FormioRatingModel,
    FormioSelectModel,
    FormioSliderModel,
    FormioSwitchModel,
    FormioTextAreaModel,
    FormioTimePickerModel
} from "../formio-core";
import { FormioPrimengFormControlComponent } from "./formio-primeng-form-control.component";
import {
    PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
    PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    PrimeNGFormControlType
} from "./formio-primeng-form.const";

describe("-primeng test suite", () => {

    let formModel = [
            new FormioCheckboxModel({id: "checkbox"}),
            new FormioCheckboxGroupModel({id: "checkboxGroup", group: []}),
            new FormioDatePickerModel({id: "datepicker"}),
            new FormioEditorModel({id: "editor"}),
            new FormioFileUploadModel({id: "upload", url: ""}),
            new FormioFormArrayModel({id: "formArray", groupFactory: () => []}),
            new FormioFormGroupModel({id: "formGroup", group: []}),
            new FormioInputModel({id: "input", maxLength: 51}),
            new FormioRadioGroupModel({id: "radioGroup"}),
            new FormioRatingModel({id: "rating"}),
            new FormioSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
            new FormioSliderModel({id: "slider"}),
            new FormioSwitchModel({id: "switch"}),
            new FormioTextAreaModel({id: "textarea"}),
            new FormioTimePickerModel({id: "timepicker"})
        ],
        testModel = formModel[7] as FormioInputModel,
        formGroup: FormGroup,
        fixture: ComponentFixture<FormioPrimengFormControlComponent>,
        component: FormioPrimengFormControlComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                FormioFormsCoreModule.forRoot(),
                AutoCompleteModule,
                CalendarModule,
                CheckboxModule,
                ChipsModule,
                DropdownModule,
                EditorModule,
                InputSwitchModule,
                InputTextModule,
                InputTextareaModule,
                MultiSelectModule,
                RadioButtonModule,
                RatingModule,
                SliderModule,
                SpinnerModule
            ],
            declarations: [FormioPrimengFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(FormioPrimengFormControlComponent);

            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
        });
    }));

    beforeEach(inject([FormioNg2DynamicFormService], (service: FormioNg2DynamicFormService) => {

        formGroup = service.createFormGroup(formModel);

        component.group = formGroup;
        component.model = testModel;

        component.ngOnChanges({

            group: new SimpleChange(null, component.group, true),
            model: new SimpleChange(null, component.model, true)
        });

        fixture.detectChanges();

        testElement = debugElement.query(By.css(`input[id='${testModel.id}']`));
    }));

    it("should initialize correctly", () => {

        expect(component.context).toBeNull();
        expect(component.control instanceof FormControl).toBe(true);
        expect(component.group instanceof FormGroup).toBe(true);
        expect(component.model instanceof FormioFormControlModel).toBe(true);
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

        expect(component.type).toEqual(PrimeNGFormControlType.Input);
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

        expect(component.onControlValueChanges).toHaveBeenCalled();
    });

    it("should update control value when model value changes", () => {

        spyOn(component, "onModelValueUpdates");

        testModel.valueUpdates.next("test");

        expect(component.onModelValueUpdates).toHaveBeenCalled();
    });

    it("should update control activation when model disabled property changes", () => {

        spyOn(component, "onModelDisabledUpdates");

        testModel.disabledUpdates.next(true);

        expect(component.onModelDisabledUpdates).toHaveBeenCalled();
    });

    it("should determine correct form control type", () => {

        let testFn = FormioPrimengFormControlComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(PrimeNGFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(PrimeNGFormControlType.Group);

        expect(testFn(formModel[2])).toEqual(PrimeNGFormControlType.Calendar);

        expect(testFn(formModel[3])).toEqual(PrimeNGFormControlType.Editor);

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toEqual(PrimeNGFormControlType.Array);

        expect(testFn(formModel[6])).toEqual(PrimeNGFormControlType.Group);

        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.Input);

        (formModel[7] as FormioInputModel).multiple = true;
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.Chips);

        (formModel[7] as FormioInputModel).list = ["test1", "test2", "test3"];
        expect(testFn(formModel[7])).toEqual(PrimeNGFormControlType.AutoComplete);

        expect(testFn(formModel[8])).toEqual(PrimeNGFormControlType.RadioGroup);

        expect(testFn(formModel[9])).toEqual(PrimeNGFormControlType.Rating);

        expect(testFn(formModel[10])).toEqual(PrimeNGFormControlType.Dropdown);

        (formModel[10] as FormioSelectModel<string>).multiple = true;
        expect(testFn(formModel[10])).toEqual(PrimeNGFormControlType.MultiSelect);

        expect(testFn(formModel[11])).toEqual(PrimeNGFormControlType.Slider);

        expect(testFn(formModel[12])).toEqual(PrimeNGFormControlType.InputSwitch);

        expect(testFn(formModel[13])).toEqual(PrimeNGFormControlType.TextArea);

        expect(testFn(formModel[14])).toEqual(PrimeNGFormControlType.Calendar);
    });

    xit("should determine correct template directives", async(() => {

        let testFn = FormioPrimengFormControlComponent.getTemplateDirectives;

        let fixture1 = TestBed.createComponent(FormioPrimengFormControlComponent),
            component1 = fixture1.componentInstance;

        (formModel[7] as FormioInputModel).list = ["test1", "test2", "test3"];

        component1.group = formGroup;
        component1.model = formModel[7];

        fixture1.detectChanges();

        expect(testFn(component1.pViewChild)).toEqual(PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES);
    }));
});