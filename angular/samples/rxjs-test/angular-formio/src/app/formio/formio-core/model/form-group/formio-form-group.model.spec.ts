import { FORMIO_FORM_CONTROL_TYPE_GROUP, FormioFormGroupModel } from "./formio-form-group.model";
import { FormioInputModel } from "../input/formio-input.model";

describe("FormioFormGroupModel test suite", () => {

    let model: FormioFormGroupModel,
        config: any = {
            id: "formGroup",
            group: [
                new FormioInputModel({
                    id: "input"
                })
            ],
            validator: {required: null}
        };

    beforeEach(() => model = new FormioFormGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length === 1).toBe(true);
        expect(model.size() === model.group.length).toBe(true);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_GROUP);
        expect(model.asyncValidator).toBeNull();
        expect(model.validator).toBeDefined();
    });

    it("should get the correct DynamicFormControlModel of group", () => {

        expect(model.get(0) === model.group[0]).toBe(true);
    });

    it("should correctly set a DynamicFormControlModel", () => {

        let newModel = new FormioInputModel({id: "newInput"});

        model.set(0, newModel);

        expect(model.get(0) === newModel).toBe(true);
    });

    it("should correctly add a DynamicFormControlModel", () => {

        let newModel = new FormioInputModel({id: "newInput"});

        model.add(newModel);

        expect(model.get(model.size() - 1) === newModel).toBe(true);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_GROUP);
        expect(Object.keys(json.validator)[0]).toEqual("required");
    });
});