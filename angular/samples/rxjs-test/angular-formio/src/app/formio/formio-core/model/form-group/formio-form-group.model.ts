import {
    FormioFormControlModel,
    FormioFormControlModelConfig,
    FormioValidatorsMap,
    ClsConfig
} from "../formio-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const FORMIO_FORM_CONTROL_TYPE_GROUP = "group";

export interface FormioFormGroupModelConfig extends FormioFormControlModelConfig {

    asyncValidator?: FormioValidatorsMap;
    group?: FormioFormControlModel[];
    legend?: string;
    validator?: FormioValidatorsMap;
}

export class FormioFormGroupModel extends FormioFormControlModel {

    @serializable() asyncValidator: FormioValidatorsMap | null;
    @serializable() group: FormioFormControlModel[] = [];
    @serializable() legend: string | null;
    @serializable() validator: FormioValidatorsMap | null;

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_GROUP;

    constructor(config: FormioFormGroupModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.asyncValidator = config.asyncValidator || null;
        this.group = Array.isArray(config.group) ? config.group : [];
        this.legend = config.legend || null;
        this.validator = config.validator || null;
    }

    get(index: number): FormioFormControlModel {
        return this.group[index];
    }

    set(index: number, controlModel: FormioFormControlModel,): void {
        this.group[index] = controlModel;
    }

    add(controlModel: FormioFormControlModel): void {
        this.group.push(controlModel);
    }

    insert(index: number, controlModel: FormioFormControlModel): void {
        this.group.splice(index, 0, controlModel);
    }

    move(index: number, step: number): void {
        this.group.splice(index + step, 0, ...this.group.splice(index, 1));
    }

    remove(index: number) {
        this.group.splice(index, 1);
    }

    size(): number {
        return this.group.length;
    }
}