import {
    FORMIO_FORM_CONTROL_TYPE_DATEPICKER,
    FormioDatePickerModel
} from "./formio-datepicker.model";

describe("FormioDatepickerModel test suite", () => {

    let model: FormioDatePickerModel,
        config = {
            id: "datepicker",
            value: new Date()
        };

    beforeEach(() => model = new FormioDatePickerModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.focusedDate).toBeNull();
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.format).toBeNull();
        expect(model.max).toBeNull();
        expect(model.min).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_DATEPICKER);
        expect(model.value).toBe(config.value);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_DATEPICKER);
        expect(json.value).toBe((model.value as Date).toJSON());
    });
});