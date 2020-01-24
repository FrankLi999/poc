import { ClsConfig } from "../formio-form-control.model";
import { 
  FormioCheckControlModel,
  FormioCheckControlModelConfig
} from "../formio-check-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const FORMIO_FORM_CONTROL_TYPE_SWITCH = "SWITCH";

export interface FormioSwitchModelConfig extends FormioCheckControlModelConfig {

    offLabel?: string;
    onLabel?: string;
}

export class FormioSwitchModel extends FormioCheckControlModel {

    @serializable() offLabel: string | null;
    @serializable() onLabel: string | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_SWITCH;

    constructor(config: FormioSwitchModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.offLabel = config.offLabel || null;
        this.onLabel = config.onLabel || null;
    }
}