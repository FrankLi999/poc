import { ClsConfig } from "../formio-form-control.model";
import { 
  FormioFormValueControlModelConfig,
  FormioFormValueControlModel } from "../formio-form-value-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_SLIDER = "SLIDER";

export interface FormioSliderModelConfig extends FormioFormValueControlModelConfig<number> {

    max?: number;
    min?: number;
    step?: number;
    vertical?: boolean;
}

export class FormioSliderModel extends FormioFormValueControlModel<number> {

    @serializable() max: number | null;
    @serializable() min: number | null;
    @serializable() step: number | null;
    @serializable() vertical: boolean;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_SLIDER;

    constructor(config: FormioSliderModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.max = Utils.isNumber(config.max) ? config.max : 10;
        this.min = Utils.isNumber(config.min) ? config.min : 0;
        this.step = Utils.isNumber(config.step) ? config.step : 1;
        this.vertical = Utils.isBoolean(config.vertical) ? config.vertical : false;
    }
}