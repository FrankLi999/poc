import {
    FormioFormControlModel,
    FormioFormControlModelConfig,
    FormioPathable,
    FormioValidatorsMap,
    ClsConfig,
} from "../formio-form-control.model";
import { serializable, serialize } from "../../decorator/serializable.decorator";
import { Utils } from "../../utils/core.utils";

export class FormioFormArrayGroupModel implements FormioPathable {

    $implicit: FormioFormArrayGroupModel;
    context: FormioFormArrayModel;
    @serializable() group: FormioFormControlModel[];
    @serializable() index: number | null;

    constructor(context: FormioFormArrayModel, group: FormioFormControlModel[] = [], index: number = null) {

        this.$implicit = this;
        this.context = context;
        this.group = group;
        this.index = index;
    }

    get parent(): FormioFormArrayModel {
        return this.context;
    }

    get(index: number): FormioFormControlModel {
        return this.group[index];
    }

    toJSON() {
        return serialize(this);
    }
}

export const FORMIO_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export interface FormioFormArrayModelConfig extends FormioFormControlModelConfig {

    asyncValidator?: FormioValidatorsMap;
    groupAsyncValidator?: FormioValidatorsMap;
    groupFactory?: () => FormioFormControlModel[];
    groupValidator?: FormioValidatorsMap;
    groups?: FormioFormArrayGroupModel[];
    initialCount?: number;
    validator?: FormioValidatorsMap;
}

export class FormioFormArrayModel extends FormioFormControlModel {

    @serializable() asyncValidator: FormioValidatorsMap | null;
    @serializable() groupAsyncValidator?: FormioValidatorsMap | null;
    groupFactory: () => FormioFormControlModel[];
    @serializable() groupValidator?: FormioValidatorsMap | null;
    @serializable() groups: FormioFormArrayGroupModel[] = [];
    @serializable() initialCount: number;
    @serializable() validator: FormioValidatorsMap | null;

    @serializable() readonly groupPrototype: FormioFormControlModel[]; // only to recreate model from JSON
    readonly origin: FormioFormControlModel[]; // deprecated - only for backwards compatibility;
    @serializable() readonly type: string = FORMIO_FORM_CONTROL_TYPE_ARRAY;

    constructor(config: FormioFormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!Utils.isFunction(config.groupFactory)) {
            throw new Error("group factory function must be specified for DynamicFormArrayModel");
        }

        this.asyncValidator = config.asyncValidator || null;
        this.groupAsyncValidator = config.groupAsyncValidator || null;
        this.groupFactory = config.groupFactory;
        this.groupPrototype = this.groupFactory();
        this.groupValidator = config.groupValidator || null;
        this.initialCount = Utils.isNumber(config.initialCount) ? config.initialCount : 1;
        this.validator = config.validator || null;

        if (Array.isArray(config.groups)) {

            config.groups.forEach((arrayGroup, index) => {
                this.groups.push(new FormioFormArrayGroupModel(this, arrayGroup.group, arrayGroup.index || index));
            });

        } else {

            for (let index = 0; index < this.initialCount; index++) {
                this.addGroup();
            }
        }
    }

    private updateGroupIndex(): void {
        this.groups.forEach((group, index) => group.index = index);
    }

    get size(): number {
        return this.groups.length;
    }

    get(index: number): FormioFormArrayGroupModel {
        return this.groups[index];
    }

    addGroup(): FormioFormArrayGroupModel {
        return this.insertGroup(this.groups.length);
    }

    insertGroup(index: number): FormioFormArrayGroupModel {

        let group = new FormioFormArrayGroupModel(this, this.groupFactory());

        this.groups.splice(index, 0, group);
        this.updateGroupIndex();

        return group;
    }

    moveGroup(index: number, step: number): void {

        this.groups.splice(index + step, 0, ...this.groups.splice(index, 1));
        this.updateGroupIndex();
    }

    removeGroup(index: number): void {

        this.groups.splice(index, 1);
        this.updateGroupIndex();
    }
}