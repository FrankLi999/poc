import { FormGroup, FormControl } from "@angular/forms";
import { FormioFormControlModel } from "../model/formio-form-control.model";
import {
    FormioFormControlRelation,
    FormioFormControlRelationGroup,
    FORMIO_FORM_CONTROL_ACTION_DISABLE,
    FORMIO_FORM_CONTROL_ACTION_ENABLE,
    FORMIO_FORM_CONTROL_CONNECTIVE_AND,
    FORMIO_FORM_CONTROL_CONNECTIVE_OR
} from "../model/formio-form-control-relation.model";

export class RelationUtils {

    static findActivationRelation(relGroups: FormioFormControlRelationGroup[]): FormioFormControlRelationGroup {

        return relGroups.find(rel => {
            return rel.action === FORMIO_FORM_CONTROL_ACTION_DISABLE || rel.action === FORMIO_FORM_CONTROL_ACTION_ENABLE;
        });
    }

    static getRelatedFormControls(model: FormioFormControlModel, controlGroup: FormGroup): FormControl[] {

        let controls: FormControl[] = [];

        model.relation.forEach(relGroup => relGroup.when.forEach(rel => {

            if (model.id === rel.id) {
                throw new Error(`FormControl ${model.id} cannot depend on itself`);
            }

            let control = controlGroup.get(rel.id) as FormControl;

            if (control && !controls.some(controlElement => controlElement === control)) {
                controls.push(control);
            }
        }));

        return controls;
    }

    static isFormControlToBeDisabled(relGroup: FormioFormControlRelationGroup, formGroup: FormGroup): boolean {

        return relGroup.when.reduce((toBeDisabled: boolean, rel: FormioFormControlRelation, index: number) => {

            let control = formGroup.get(rel.id);

            if (control && relGroup.action === FORMIO_FORM_CONTROL_ACTION_DISABLE) {

                if (index > 0 && relGroup.connective === FORMIO_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) {
                    return false;
                }

                if (index > 0 && relGroup.connective === FORMIO_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) {
                    return true;
                }

                return rel.value === control.value || rel.status === control.status;
            }

            if (control && relGroup.action === FORMIO_FORM_CONTROL_ACTION_ENABLE) {

                if (index > 0 && relGroup.connective === FORMIO_FORM_CONTROL_CONNECTIVE_AND && toBeDisabled) {
                    return true;
                }

                if (index > 0 && relGroup.connective === FORMIO_FORM_CONTROL_CONNECTIVE_OR && !toBeDisabled) {
                    return false;
                }

                return !(rel.value === control.value || rel.status === control.status);
            }

            return false;

        }, false);
    }
}