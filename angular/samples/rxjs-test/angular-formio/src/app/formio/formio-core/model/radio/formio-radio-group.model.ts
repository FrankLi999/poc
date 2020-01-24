import { ClsConfig } from "../formio-form-control.model";
import {
  FormioOptionControlModel,
  FormioOptionControlModelConfig
} from "../formio-option-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export interface FormioRadioGroupModelConfig<T> extends FormioOptionControlModelConfig<T> {

    legend?: string;
}

export class FormioRadioGroupModel<T> extends FormioOptionControlModel<T> {

    @serializable() legend: string | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP;

    constructor(config: FormioRadioGroupModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.legend = config.legend || null;
    }

    select(index: number): void {
        this.valueUpdates.next(this.get(index).value);
    }
}