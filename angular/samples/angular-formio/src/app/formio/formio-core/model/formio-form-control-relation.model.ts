import {FormioFormControlValue } from "./formio-form-value-control.model";

export const FORMIO_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
export const FORMIO_FORM_CONTROL_ACTION_ENABLE = "ENABLE";

export const FORMIO_FORM_CONTROL_CONNECTIVE_AND = "AND";
export const FORMIO_FORM_CONTROL_CONNECTIVE_OR = "OR";

export interface FormioFormControlRelation {

    id: string;
    status?: string;
    value?: FormioFormControlValue;
}

export interface FormioFormControlRelationGroup {

    action: string;
    connective?: string;
    when: FormioFormControlRelation[];
}