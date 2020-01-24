import { ClsConfig } from "../formio-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";
import {
  FormioDateControlModel,
  FormioDateControlModelConfig
} from "../formio-date-control.model";

export const FORMIO_FORM_CONTROL_TYPE_TIMEPICKER = "TIMEPICKER";

export interface FormioTimePickerModelConfig extends FormioDateControlModelConfig {

    meridian?: boolean;
    showSeconds?: boolean;
}

export class FormioTimePickerModel extends FormioDateControlModel {

    @serializable() meridian: boolean;
    @serializable() showSeconds: boolean;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_TIMEPICKER;

    constructor(config: FormioTimePickerModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.meridian = Utils.isBoolean(config.meridian) ? config.meridian : false;
        this.showSeconds = Utils.isBoolean(config.showSeconds) ? config.showSeconds : false;
    }
}