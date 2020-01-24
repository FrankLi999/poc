import {
    FORMIO_FORM_CONTROL_TYPE_TIMEPICKER,
    FormioTimePickerModel
} from "./formio-timepicker.model";

describe("DynamicTimePickerModel test suite", () => {

    let model: FormioTimePickerModel,
        config = {
            id: "timepicker",
            value: new Date()
        };

    beforeEach(() => model = new FormioTimePickerModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.format).toBeNull();
        expect(model.max).toBeNull();
        expect(model.meridian).toBe(false);
        expect(model.min).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.showSeconds).toBe(false);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(model.value).toBe(config.value);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(json.value).toBe((model.value as Date).toJSON());
    });
});