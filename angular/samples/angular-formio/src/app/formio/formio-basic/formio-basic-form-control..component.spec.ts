import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { DebugElement, SimpleChange } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { TextMaskModule } from "angular2-text-mask";
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
    FormioSelectModel,
    FormioSliderModel,
    FormioSwitchModel,
    FormioTextAreaModel,
    FormioTimePickerModel
} from "../formio-core";
import { FormioBasicFormControlType, FormioBasicFormControlComponent } from "./formio-basic-form-control.component";

describe("FormioBasicFormControlComponent test suite", () => {

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
            new FormioSelectModel({id: "select", options: [{value: "One"}, {value: "Two"}], value: "One"}),
            new FormioSliderModel({id: "slider"}),
            new FormioSwitchModel({id: "switch"}),
            new FormioTextAreaModel({id: "textarea"}),
            new FormioTimePickerModel({id: "timepicker"})
        ],
        testModel = formModel[7] as FormioInputModel,
        formGroup: FormGroup,
        fixture: ComponentFixture<FormioBasicFormControlComponent>,
        component: FormioBasicFormControlComponent,
        debugElement: DebugElement,
        testElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [ReactiveFormsModule, TextMaskModule, FormioFormsCoreModule.forRoot()],
            declarations: [FormioBasicFormControlComponent]

        }).compileComponents().then(() => {

            fixture = TestBed.createComponent(FormioBasicFormControlComponent);

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
        expect(component.showErrorMessages).toBe(false);

        expect(component.type).toEqual(FormioBasicFormControlType.Input);
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

        let testFn = FormioBasicFormControlComponent.getFormControlType;

        expect(testFn(formModel[0])).toEqual(FormioBasicFormControlType.Checkbox);

        expect(testFn(formModel[1])).toEqual(FormioBasicFormControlType.Group);

        expect(testFn(formModel[2])).toBeNull();

        expect(testFn(formModel[3])).toBeNull();

        expect(testFn(formModel[4])).toBeNull();

        expect(testFn(formModel[5])).toEqual(FormioBasicFormControlType.Array);

        expect(testFn(formModel[6])).toEqual(FormioBasicFormControlType.Group);

        expect(testFn(formModel[7])).toEqual(FormioBasicFormControlType.Input);

        expect(testFn(formModel[8])).toEqual(FormioBasicFormControlType.RadioGroup);

        expect(testFn(formModel[9])).toEqual(FormioBasicFormControlType.Select);

        expect(testFn(formModel[10])).toBeNull();

        expect(testFn(formModel[11])).toBeNull();

        expect(testFn(formModel[12])).toEqual(FormioBasicFormControlType.TextArea);

        expect(testFn(formModel[13])).toBeNull();
    });
});