import { FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP, FormioCheckboxGroupModel } from "./formio-checkbox-group.model";
import { FormioCheckboxModel } from "./formio-checkbox.model";

describe("FormioCheckboxGroupModel test suite", () => {

    let model: FormioCheckboxGroupModel,
        config = {
            id: "checkboxGroup",
            group: [
                new FormioCheckboxModel(
                    {
                        id: "checkbox1",
                        label: "Checkbox 1",
                        value: true
                    }
                ),
                new FormioCheckboxModel(
                    {
                        id: "checkbox2",
                        label: "Checkbox 2",
                        value: false
                    }
                ),
                new FormioCheckboxModel(
                    {
                        id: "checkbox3",
                        label: "Checkbox 3",
                        value: false
                    }
                )
            ]
        };

    beforeEach(() => model = new FormioCheckboxGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(config.group.length);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });

    it("should check checkboxes correctly", () => {

        model.check(0, 2);

        expect(model.group[0].value).toBe(true);
        expect(model.group[2].value).toBe(true);
    });

    it("should check all checkboxes correctly", () => {

        model.checkAll();

        expect(model.group[0].value).toBe(true);
        expect(model.group[1].value).toBe(true);
        expect(model.group[2].value).toBe(true);
    });

    it("should uncheck checkboxes correctly", () => {

        model.uncheck(0, 2);

        expect(model.group[0].value).toBe(false);
        expect(model.group[2].value).toBe(false);
    });

    it("should uncheck all checkboxes correctly", () => {

        model.uncheckAll();

        expect(model.group[0].value).toBe(false);
        expect(model.group[1].value).toBe(false);
        expect(model.group[2].value).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });
});