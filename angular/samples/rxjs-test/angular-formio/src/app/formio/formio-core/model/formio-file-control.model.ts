import { ClsConfig } from "./formio-form-control.model";
import { 
  FormioFormValueControlModelConfig,
  FormioFormValueControlModel
} from "./formio-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export interface FormioFileControlModelConfig extends FormioFormValueControlModelConfig<File | File[]> {

    multiple?: boolean;
}

export abstract class FormioFileControlModel extends FormioFormValueControlModel<File | File[]> {

    @serializable() multiple: boolean;

    constructor(config: FormioFileControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.multiple = Utils.isBoolean(config.multiple) ? config.multiple : false;
    }
}