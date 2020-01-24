import { ClsConfig } from "../formio-form-control.model";
import { FormioCheckControlModel, FormioCheckControlModelConfig } from "../formio-check-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_CHECKBOX = "CHECKBOX";

export interface FormioCheckboxModelConfig extends FormioCheckControlModelConfig {

    indeterminate?: boolean;
}

export class FormioCheckboxModel extends FormioCheckControlModel {

    @serializable() indeterminate: boolean;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_CHECKBOX;

    constructor(config: FormioCheckboxModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.indeterminate = Utils.isBoolean(config.indeterminate) ? config.indeterminate : false;
    }
}