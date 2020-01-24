import { ClsConfig } from "../formio-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";
import { FormioDateControlModel, FormioDateControlModelConfig } from "../formio-date-control.model";

export const FORMIO_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface FormioDatePickerModelConfig extends FormioDateControlModelConfig {

    focusedDate?: string | Date;
    inline?: boolean;
    toggleIcon?: string;
}

export class FormioDatePickerModel extends FormioDateControlModel {

    @serializable() focusedDate: string | Date | null;
    @serializable() inline: boolean;
    @serializable() toggleIcon: string | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: FormioDatePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.focusedDate = config.focusedDate || null;
        this.inline = Utils.isBoolean(config.inline) ? config.inline : false;
        this.toggleIcon = Utils.isString(config.toggleIcon) ? config.toggleIcon : null;
    }
}