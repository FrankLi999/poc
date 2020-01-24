import { ClsConfig } from "./formio-form-control.model";
import { 
  FormioFormValueControlModelConfig, 
  FormioFormValueControlModel 
} from "./formio-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";

export interface FormioDateControlModelConfig extends FormioFormValueControlModelConfig<string | Date> {

    format?: string;
    max?: string | Date;
    min?: string | Date;
    placeholder?: string;
}

export abstract class FormioDateControlModel extends FormioFormValueControlModel<string | Date> {

    @serializable() format: string | null;
    @serializable() max: string | Date | null;
    @serializable() min: string | Date | null;
    @serializable() placeholder: string | null;

    constructor(config: FormioDateControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.format = config.format || null;
        this.max = config.max || null;
        this.min = config.min || null;
        this.placeholder = config.placeholder || null;
    }
}