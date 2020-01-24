import {
  FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER
} from "../formio-check-control.model";
import { 
  FORMIO_FORM_CONTROL_TYPE_SWITCH,
  FormioSwitchModel
} from "./formio-switch.model";

describe("FormioSwitchModel test suite", () => {

    let model: FormioSwitchModel,
        config = {
            id: "switch"
        };

    beforeEach(() => model = new FormioSwitchModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toEqual(FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER);
        expect(model.offLabel).toBeNull();
        expect(model.onLabel).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(FORMIO_FORM_CONTROL_TYPE_SWITCH);
        expect(model.value).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(FORMIO_FORM_CONTROL_TYPE_SWITCH);
    });
});