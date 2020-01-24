import { FormioFormControlRelationGroup } from "./formio-form-control-relation.model";
import { Subject } from "rxjs/Subject";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export interface FormioPathable {

    id?: string;
    index?: number;
    parent: FormioPathable;
}

export interface FormioValidatorConfig {

    name: string;
    args: any;
}

export type FormioValidatorsMap = { [validatorKey: string]: any | FormioValidatorConfig };

export interface Cls {

    container?: string;
    control?: string;
    errors?: string;
    group?: string;
    hint?: string;
    host?: string;
    label?: string;
}

export interface ClsConfig {

    element?: Cls;
    grid?: Cls;
}

export function createEmptyClsConfig(): Cls {

    return {
        container: "",
        control: "",
        errors: "",
        group: "",
        hint: "",
        host: "",
        label: ""
    };
}

export interface FormioFormControlModelConfig {

    disabled?: boolean;
    errorMessages?: FormioValidatorsMap;
    id?: string;
    label?: string;
    relation?: FormioFormControlRelationGroup[];
}

export abstract class FormioFormControlModel implements FormioPathable {

    @serializable() cls: any = {};
    @serializable("disabled") _disabled: boolean;
    disabledUpdates: Subject<boolean>;
    @serializable() errorMessages: FormioValidatorsMap | null;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() name: string;
    parent: FormioPathable | null = null;
    @serializable() relation: FormioFormControlRelationGroup[];

    abstract readonly type: string;

    constructor(config: FormioFormControlModelConfig, cls: ClsConfig = {}) {

        if (Utils.isEmptyString(config.id)) {
            throw new Error("string id must be specified for DynamicFormControlModel");
        }

        this.cls.element = Utils.merge(cls.element, createEmptyClsConfig());
        this.cls.grid = Utils.merge(cls.grid, createEmptyClsConfig());

        this._disabled = Utils.isBoolean(config.disabled) ? config.disabled : false;
        this.errorMessages = config.errorMessages || null;
        this.id = config.id;
        this.label = config.label || null;
        this.name = this.id;
        this.relation = Array.isArray(config.relation) ? config.relation : [];

        this.disabledUpdates = new Subject<boolean>();
        this.disabledUpdates.subscribe((value: boolean) => this.disabled = value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    get hasErrorMessages(): boolean {
        return Utils.isDefined(this.errorMessages);
    }

    toJSON() {
        return serialize(this);
    }
}
