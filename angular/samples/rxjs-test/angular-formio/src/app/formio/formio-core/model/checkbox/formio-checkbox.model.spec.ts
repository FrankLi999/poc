import { FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER } from "../formio-check-control.model";
import { FORMIO_FORM_CONTROL_TYPE_CHECKBOX, FormioCheckboxModel } from "./formio-checkbox.model";

describe("FormioCheckboxModel test suite", () => {

    let model: FormioCheckboxModel,
        config = {
            id: "checkbox",
            value: true
        };

    beforeEach(() => model = new FormioCheckboxModel(config));

    it("should initialize correctly", () => {

        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.indeterminate).toBe(false);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toEqual(FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER);
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_CHECKBOX);
        expect(model.validators).toBeNull();
        expect(model.value).toBe(config.value);
    });

    it("should get and set checked property correctly", () => {

        expect(model.checked).toBe(config.value);

        model.checked = false;

        expect(model.checked).toBe(false);
        expect(model.value).toBe(false);
    });

    it("should toggle correctly", () => {

        model.toggle();

        expect(model.checked).toBe(!config.value);
        expect(model.value).toBe(!config.value);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_CHECKBOX);
    });
});