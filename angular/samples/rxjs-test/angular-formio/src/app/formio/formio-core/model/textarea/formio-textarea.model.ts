import { ClsConfig } from "../formio-form-control.model";
import {
  FormioInputControlModel, 
  FormioInputControlModelConfig 
} from "../formio-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_TEXTAREA = "TEXTAREA";

export const FORMIO_FORM_TEXTAREA_WRAP_HARD = "hard";
export const FORMIO_FORM_TEXTAREA_WRAP_SOFT = "soft";

export interface FormioTextAreaModelConfig extends FormioInputControlModelConfig<string> {

    cols?: number;
    rows?: number;
    wrap?: string;
}

export class FormioTextAreaModel extends FormioInputControlModel<string> {

    @serializable() cols: number;
    @serializable() rows: number;
    @serializable() wrap: string;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_TEXTAREA;

    constructor(config: FormioTextAreaModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.cols = Utils.isNumber(config.cols) ? config.cols : 20;
        this.rows = Utils.isNumber(config.rows) ? config.rows : 2;
        this.wrap = config.wrap || FORMIO_FORM_TEXTAREA_WRAP_SOFT;
    }
}