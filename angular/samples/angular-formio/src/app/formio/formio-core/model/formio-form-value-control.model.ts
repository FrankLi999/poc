import { Subject } from "rxjs/Subject";
import {
    FormioFormControlModel,
    FormioFormControlModelConfig,
    FormioValidatorsMap,
    ClsConfig
} from "./formio-form-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export type FormioFormControlValue = boolean | number | string | Date | Array<boolean | number | string>;

export interface FormioFormValueControlModelConfig<T> extends FormioFormControlModelConfig {

    asyncValidators?: FormioValidatorsMap;
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    validators?: FormioValidatorsMap;
    value?: T;
}

export abstract class FormioFormValueControlModel<T> extends FormioFormControlModel {

    @serializable() asyncValidators: FormioValidatorsMap | null;
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable() validators: FormioValidatorsMap | null;
    @serializable("value") _value: T | null;
    valueUpdates: Subject<T>;

    constructor(config: FormioFormValueControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidators = config.asyncValidators || null;
        this.hint = config.hint || null;
        this.required = Utils.isBoolean(config.required) ? config.required : false;
        this.tabIndex = config.tabIndex || null;
        this.validators = config.validators || null;
        this._value = config.value || null;

        this.valueUpdates = new Subject<T>();
        this.valueUpdates.subscribe((value: T) => this.value = value);
    }

    set value(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }
}