import {
    FORMIO_FORM_CONTROL_TYPE_ARRAY,
    FormioFormArrayModel,
    FormioFormArrayGroupModel
} from "./formio-form-array.model";
import { FormioInputModel } from "../input/formio-input.model";

describe("FormioFormArrayModel test suite", () => {

    let model: FormioFormArrayModel,
        config: any = {
            id: "formArray",
            initialCount: 3,
            groupFactory: () => [
                new FormioInputModel({
                    id: "input"
                }),
                new FormioFormArrayModel({
                    id: "nestedFormArray",
                    groupFactory: () => [
                        new FormioInputModel({
                            id: "nestedInput"
                        }),
                    ]
                })
            ],
            validator: {required: null}
        };

    beforeEach(() => model = new FormioFormArrayModel(config));

    it("should initialize correctly", () => {

        expect(model.initialCount).toBe(config.initialCount);
        expect(model.size).toBe(model.initialCount);
        expect(model.id).toEqual(config.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_ARRAY);
        expect(model.asyncValidator).toBeNull();
        expect(model.validator).toBeDefined();
        expect(model.groupFactory().length).toEqual(2);
        expect(model.removeGroup).toBeDefined();
    });

    it("should throw when no createGroup function is specified", () => {

        expect(() => new FormioFormArrayModel({id: "test"}))
            .toThrow(new Error("group factory function must be specified for FormioFormArrayModel"));
    });

    it("should get the correct group model", () => {

        expect(model.get(0) instanceof FormioFormArrayGroupModel).toBe(true);
        expect(model.get(1) instanceof FormioFormArrayGroupModel).toBe(true);
    });

    it("should add another form array group", () => {

        model.addGroup();

        expect(model.size).toBe(config.initialCount + 1);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.asyncValidators).toBeUndefined();
        expect(json.id).toEqual(model.id);
        expect(json.groups.length).toEqual(model.size);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_ARRAY);
        expect(Object.keys(json.validator)[0]).toEqual("required");
        expect(json.validators).toBeUndefined();
    });
});