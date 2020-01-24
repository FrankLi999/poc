import { ClsConfig } from "../formio-form-control.model";
import { FormioInputControlModel, FormioInputControlModelConfig } from "../formio-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const FORMIO_FORM_CONTROL_TYPE_EDITOR = "EDITOR";

export interface FormioEditorModelConfig extends FormioInputControlModelConfig<string> {
}

export class FormioEditorModel extends FormioInputControlModel<string> {

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_EDITOR;

    constructor(config: FormioEditorModelConfig, cls?: ClsConfig) {

        super(config, cls);
    }
}