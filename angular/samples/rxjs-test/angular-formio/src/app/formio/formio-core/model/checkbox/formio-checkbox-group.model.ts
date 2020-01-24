import { ClsConfig } from "../formio-form-control.model";
import { FormioFormGroupModel, FormioFormGroupModelConfig } from "../form-group/formio-form-group.model";
import { FormioCheckboxModel } from "./formio-checkbox.model";
import { serializable } from "../../decorator/serializable.decorator";

export const FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class FormioCheckboxGroupModel extends FormioFormGroupModel {

    @serializable() group: FormioCheckboxModel[];

    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP;

    constructor(config: FormioFormGroupModelConfig, cls?: ClsConfig) {
        super(config, cls);
    }

    check(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = true);
    }

    uncheck(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = false);
    }

    checkAll(): void {
        this.group.forEach(model => model.checked = true);
    }

    uncheckAll(): void {
        this.group.forEach(model => model.checked = false);
    }
}