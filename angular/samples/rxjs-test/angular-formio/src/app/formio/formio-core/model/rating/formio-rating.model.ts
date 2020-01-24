import { ClsConfig } from "../formio-form-control.model";
import {
  FormioFormValueControlModelConfig,
  FormioFormValueControlModel
} from "../formio-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_RATING = "RATING";

export interface FormioRatingModelConfig extends FormioFormValueControlModelConfig<number> {

    max?: number;
}

export class FormioRatingModel extends FormioFormValueControlModel<number> {

    @serializable() max: number | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_RATING;

    constructor(config: FormioRatingModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.max = Utils.isNumber(config.max) ? config.max : 10;
    }
}