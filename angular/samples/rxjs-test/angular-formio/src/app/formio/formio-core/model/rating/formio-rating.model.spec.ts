import {
  FORMIO_FORM_CONTROL_TYPE_RATING, 
  FormioRatingModel
} from "./formio-rating.model";

describe("FormioRatingModel test suite", () => {

    let model: FormioRatingModel,
        config = {
            id: "rating",
            max: 5,
            value: 2
        };

    beforeEach(() => model = new FormioRatingModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.max).toBe(config.max);
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_RATING);
        expect(model.value).toBe(config.value);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_RATING);
    });
});