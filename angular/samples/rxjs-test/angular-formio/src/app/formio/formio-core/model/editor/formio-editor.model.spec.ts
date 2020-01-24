import { FORMIO_FORM_CONTROL_TYPE_EDITOR, FormioEditorModel } from "./formio-editor.model";

describe("FormioEditorModel test suite", () => {

    let model: FormioEditorModel,
        config: any = {
            id: "editor",
            validators: {required: null, minLength: 5}
        };

    beforeEach(() => model = new FormioEditorModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.errorMessages).toBeNull();
        expect(model.hasErrorMessages).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_EDITOR);
        expect(model.value).toBeNull();
    });

    it("should throw when no model id is specified", () => {

        expect(() => new FormioEditorModel({}))
            .toThrow(new Error("string id must be specified for DynamicFormControlModel"));
    });

    it("should set disabled property correctly", () => {

        model.disabledUpdates.next(true);

        expect(model.disabled).toBe(true);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(Object.keys(json.validators).length).toBe(Object.keys(model.validators).length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_EDITOR);
    });
});