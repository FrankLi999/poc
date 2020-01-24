import { ClsConfig } from "./formio-form-control.model";
import { FormioFormValueControlModel, FormioFormValueControlModelConfig } from "./formio-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export interface FormioCheckControlModelConfig extends FormioFormValueControlModelConfig<boolean> {

    labelPosition?: string;
}

export const FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER = "after";
export const FORMIO_CHECK_CONTROL_LABEL_POSITION_BEFORE = "before";

export abstract class FormioCheckControlModel extends FormioFormValueControlModel<boolean> {

    @serializable() labelPosition: string;

    constructor(config: FormioCheckControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.labelPosition = config.labelPosition || FORMIO_CHECK_CONTROL_LABEL_POSITION_AFTER;
        this.value = Utils.isBoolean(this.value) ? this.value : false;
    }

    get checked(): boolean {
        return this.value;
    }

    set checked(checked: boolean) {
        this.valueUpdates.next(checked);
    }

    toggle(): void {
        this.checked = !this.checked;
    }
}