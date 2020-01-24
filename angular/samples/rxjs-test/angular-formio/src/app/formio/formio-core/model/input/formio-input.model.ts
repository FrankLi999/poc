import { ClsConfig } from "../formio-form-control.model";
import {
  FormioInputControlModel,
  FormioInputControlModelConfig
} from "../formio-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export const FORMIO_FORM_CONTROL_TYPE_INPUT = "INPUT";

export const FORMIO_FORM_CONTROL_INPUT_TYPE_COLOR = "color";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_DATE = "date";
//export const FORMIO_FORM_CONTROL_INPUT_TYPE_DATETIME = "datetime";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_DATETIME_LOCAL = "datetime-local";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_EMAIL = "email";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_FILE = "file";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_MONTH = "month";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_NUMBER = "number";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_PASSWORD = "password";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_RANGE = "range";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_SEARCH = "search";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_TEL = "tel";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_TEXT = "text";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_TIME = "time";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_URL = "url";
export const FORMIO_FORM_CONTROL_INPUT_TYPE_WEEK = "week";

export interface FormioInputModelConfig extends FormioInputControlModelConfig<string | number | Date | string[]> {

    accept?: string;
    inputType?: string;
    list?: string[];
    mask?: string | RegExp | (string | RegExp)[];
    max?: number | string | Date;
    min?: number | string | Date;
    multiple?: boolean;
    pattern?: string;
    step?: number;
}

export class FormioInputModel extends FormioInputControlModel<string | number | Date | string[]> {

    @serializable() accept: string | null;
    @serializable() inputType: string;
    files: FileList | null = null;
    @serializable() list: string[] | null;
    @serializable() mask: string | RegExp | (string | RegExp)[] | null;
    @serializable() max: number | string | Date | null;
    @serializable() min: number | string | Date | null;
    @serializable() multiple: boolean | null;
    @serializable() pattern: string | null;
    @serializable() step: number | null;

    private listId: string | null = null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_INPUT;

    constructor(config: FormioInputModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.accept = config.accept || null;
        this.inputType = config.inputType || FORMIO_FORM_CONTROL_INPUT_TYPE_TEXT;
        this.list = Array.isArray(config.list) ? config.list : null;
        this.mask = config.mask || null;
        this.max = Utils.isDefined(config.max) ? config.max : null;
        this.min = Utils.isDefined(config.min) ? config.min : null;
        this.multiple = Utils.isBoolean(config.multiple) ? config.multiple : null;
        this.pattern = config.pattern || null;
        this.step = Utils.isNumber(config.step) ? config.step : null;

        if (this.list) {
            this.listId = `${this.id}List`;
        }
    }

    toJSON() {

        let json: any = super.toJSON();

        if (this.mask !== null) { json.mask = Utils.maskToString(this.mask); }

        return json;
    }
}