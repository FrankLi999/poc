import { ClsConfig } from "../formio-form-control.model";
import { 
  FormioOptionControlModel,
  FormioOptionControlModelConfig
} from "../formio-option-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface FormioSelectModelConfig<T> extends FormioOptionControlModelConfig<T> {

    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
}

export class FormioSelectModel<T> extends FormioOptionControlModel<T> {

    @serializable() filterable: boolean;
    @serializable() multiple: boolean;
    @serializable() placeholder: string;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_SELECT;

    constructor(config: FormioSelectModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.filterable = Utils.isBoolean(config.filterable) ? config.filterable : false;
        this.multiple = Utils.isBoolean(config.multiple) ? config.multiple : false;
        this.placeholder = config.placeholder || "";
    }

    select(...indices: number[]): void {

        let value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;

        this.valueUpdates.next(value);
    }
}