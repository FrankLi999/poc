import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { FormioNg2DynamicFormService } from "../service/formio-ng2-dynamic-form.service";
import { FormioNg2DynamicFormValidationService } from "../service/formio-ng2-dynamic-form-validation.service";
import { FormioRadioGroupModel } from "../model/radio/formio-radio-group.model";
import { FormioSelectModel } from "../model/select/formio-select.model";
import { FormioTextAreaModel } from "../model/textarea/formio-textarea.model";
import { RelationUtils } from "./relation.utils";

describe("FormControlRelation utils test suite", () => {

    let controlGroup: FormGroup,
        model: FormioTextAreaModel = new FormioTextAreaModel({id: "testTextArea"}),
        rel1 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel2 = {
            action: "ENABLE",
            connective: "AND",
            when: [
                {
                    id: "testSelect",
                    value: "option-3"
                },
                {
                    id: "testRadioGroup",
                    value: "option-2",
                }
            ]
        },
        rel3 = {
            action: "DISABLE",
            connective: "AND",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel4 = {
            action: "ENABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-2",
                }
            ]
        },
        rel5 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [FormioNg2DynamicFormService, FormioNg2DynamicFormValidationService]
        });
    });

    beforeEach(inject([FormioNg2DynamicFormService], (formService: FormioNg2DynamicFormService) => {

        controlGroup = formService.createFormGroup([

            new FormioSelectModel({

                id: "testSelect",
                options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                value: "option-1"
            }),

            new FormioRadioGroupModel({

                id: "testRadioGroup",
                options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                value: "option-1"
            }),

            model
        ]);
    }));

    it("should find an activation relation correctly", () => {

        model.relation = [rel1];
        expect(RelationUtils.findActivationRelation(model.relation)).toBe(rel1);

        model.relation = [rel2];
        expect(RelationUtils.findActivationRelation(model.relation)).toBe(rel2);
    });

    it("should get all related form controls correctly", () => {

        model.relation = [rel2];

        expect(RelationUtils.getRelatedFormControls(model, controlGroup).length).toBe(2);
    });

    it("should throw when model depends on itself", () => {

        model.relation = [{
            action: "DISABLE",
            when: [
                {
                    id: "testTextArea",
                    value: "test"
                }
            ]
        }];

        expect(() => RelationUtils.getRelatedFormControls(model, controlGroup))
            .toThrow(new Error(`FormControl ${model.id} cannot depend on itself`));
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relation = [rel1];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel2];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [rel3];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel4];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel5];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [{action: "TEST", when: [{id: "testTextArea", value: "test"}]}];
        expect(RelationUtils.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);
    });
});