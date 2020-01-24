import { 
  FORMIO_FORM_CONTROL_TYPE_SLIDER,
  FormioSliderModel
} from "./formio-slider.model";

describe("FormioSliderModel test suite", () => {

    let model: FormioSliderModel,
        config = {
            id: "slider",
            min: 0,
            max: 100,
            step: 1,
            value: 27
        };

    beforeEach(() => model = new FormioSliderModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.min).toBe(config.min);
        expect(model.max).toBe(config.max);
        expect(model.name).toEqual(model.id);
        expect(model.step).toBe(config.step);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_SLIDER);
        expect(model.value).toBe(config.value);
        expect(model.vertical).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_SLIDER);
    });
});