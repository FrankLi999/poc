import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
    FormioFormControlModel,
    FormioPathable,
    FormioValidatorsMap
} from "../model/formio-form-control.model";
import { FormioFormValueControlModel, FormioFormControlValue } from "../model/formio-form-value-control.model";
import {
    FormioFormArrayModel,
    FORMIO_FORM_CONTROL_TYPE_ARRAY,
    FormioFormArrayGroupModel
} from "../model/form-array/formio-form-array.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_GROUP, 
    FormioFormGroupModel 
} from "../model/form-group/formio-form-group.model";
import {
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    FormioCheckboxGroupModel
} from "../model/checkbox/formio-checkbox-group.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX, 
    FormioCheckboxModel 
} from "../model/checkbox/formio-checkbox.model";
import {
    FORMIO_FORM_CONTROL_TYPE_DATEPICKER,
    FormioDatePickerModel
} from "../model/datepicker/formio-datepicker.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_EDITOR, 
    FormioEditorModel 
} from "../model/editor/formio-editor.model";
import {
    FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD,
    FormioFileUploadModel
} from "../model/file-upload/formio-file-upload.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_INPUT, 
    FormioInputModel 
} from "../model/input/formio-input.model";
import {
    FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP,
    FormioRadioGroupModel
} from "../model/radio/formio-radio-group.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_RATING, 
    FormioRatingModel } from "../model/rating/formio-rating.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_SELECT, 
    FormioSelectModel 
} from "../model/select/formio-select.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_SLIDER, 
    FormioSliderModel 
} from "../model/slider/formio-slider.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_SWITCH, 
    FormioSwitchModel 
} from "../model/switch/formio-switch.model";
import { 
    FORMIO_FORM_CONTROL_TYPE_TEXTAREA, 
    FormioTextAreaModel 
} from "../model/textarea/formio-textarea.model";
import {
    FORMIO_FORM_CONTROL_TYPE_TIMEPICKER,
    FormioTimePickerModel
} from "../model/timepicker/formio-timepicker.model";
import { Utils } from "../utils/core.utils";
import { FormioNg2DynamicFormValidationService } from "./formio-ng2-dynamic-form-validation.service";

@Injectable()
export class FormioNg2DynamicFormService {

    constructor(private formBuilder: FormBuilder, 
        private validationService: FormioNg2DynamicFormValidationService) {}

    createExtra(validator: FormioValidatorsMap, asyncValidator: FormioValidatorsMap): { [key: string]: any } {

        return {
            validator: this.validationService.getValidator(validator),
            asyncValidator: this.validationService.getAsyncValidator(asyncValidator)
        };
    }

    createFormArray(model: FormioFormArrayModel): FormArray {
        let formArray = [];
        for (let index = 0; index < model.size; index++) {
            let groupModel = model.get(index),
                extra = this.createExtra(model.groupValidator, model.groupAsyncValidator);
            formArray.push(this.createFormGroup(groupModel.group, extra, groupModel));
        }
        return this.formBuilder.array(
            formArray,
            this.validationService.getValidator(model.validator),
            this.validationService.getAsyncValidator(model.asyncValidator)
        );
    }

    createFormGroup(groupModel: FormioFormControlModel[],
                    extra: { [key: string]: any } | null = null,
                    parent: FormioPathable = null): FormGroup {
        let formGroup: { [id: string]: AbstractControl; } = {};
        groupModel.forEach(model => {
            model.parent = parent;
            if (model.type === FORMIO_FORM_CONTROL_TYPE_ARRAY) {
                let formArrayModel = model as FormioFormArrayModel;
                formGroup[model.id] = this.createFormArray(formArrayModel);
            } else if (model.type === FORMIO_FORM_CONTROL_TYPE_GROUP || model.type === FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {
                let formGroupModel = model as FormioFormGroupModel,
                    extra = this.createExtra(formGroupModel.validator, formGroupModel.asyncValidator);
                formGroup[model.id] = this.createFormGroup(formGroupModel.group, extra, formGroupModel);
            } else {
                let formControlModel = model as FormioFormValueControlModel<FormioFormControlValue>;
                formGroup[formControlModel.id] = new FormControl(                    {
                        value: formControlModel.value,
                        disabled: formControlModel.disabled
                    },
                    Validators.compose(this.validationService.getValidators(formControlModel.validators)),
                    Validators.composeAsync(this.validationService.getAsyncValidators(formControlModel.asyncValidators))
                );
            }
        });
        return this.formBuilder.group(formGroup, extra);
    }

    getPathSegment(model: FormioPathable): string {
        return model instanceof FormioFormArrayGroupModel ?
            model.index.toString() : (model as FormioFormControlModel).id;
    }

    getPath(model: FormioPathable): string[] {
        let path = [this.getPathSegment(model)],
            parent = model.parent;
        while (parent) {
            path.unshift(this.getPathSegment(parent));
            parent = parent.parent;
        }
        return path;
    }
    
    addFormGroupControl(formGroup: FormGroup,
                        groupModel: FormioFormControlModel[] | FormioFormGroupModel,
                        ...controlModels: FormioFormControlModel[]): void {
        if (groupModel instanceof FormioFormGroupModel) {
            this.insertFormGroupControl(groupModel.size(), formGroup, groupModel, ...controlModels);
        } else {
            let formModel = groupModel as FormioFormControlModel[];
            this.insertFormGroupControl(formModel.length, formGroup, formModel, ...controlModels);
        }
    }
    moveFormGroupControl(index: number,
                         step: number,
                         groupModel: FormioFormControlModel[] | FormioFormGroupModel): void {
        if (groupModel instanceof FormioFormGroupModel) {
            groupModel.move(index, step);
        } else {
            let formModel = groupModel as FormioFormControlModel[];
            formModel.splice(index + step, 0, ...formModel.splice(index, 1));
        }
    }

    insertFormGroupControl(index: number,
                           formGroup: FormGroup,
                           groupModel: FormioFormControlModel[] | FormioFormGroupModel,
                           ...controlModels: FormioFormControlModel[]): void {
        let parent = groupModel instanceof FormioFormGroupModel ? groupModel : null,
            controls = this.createFormGroup(controlModels, null, parent).controls;
        Object.keys(controls).forEach((controlName, idx) => {
            let controlModel = controlModels[idx];
            if (groupModel instanceof FormioFormGroupModel) {
                groupModel.insert(index, controlModel);
            } else {
                (groupModel as FormioFormControlModel[]).splice(index, 0, controlModel);
            }
            formGroup.addControl(controlName, controls[controlName]);
        });
    }

    removeFormGroupControl(index: number,
                           formGroup: FormGroup,
                           groupModel: FormioFormControlModel[] | FormioFormGroupModel): void {
        if (groupModel instanceof FormioFormGroupModel) {
            formGroup.removeControl(groupModel.get(index).id);
            groupModel.remove(index);
        } else {
            formGroup.removeControl(groupModel[index].id);
            (groupModel as FormioFormControlModel[]).splice(index, 1);
        }
    }

    addFormArrayGroup(formArray: FormArray, model: FormioFormArrayModel): void {
        let groupModel = model.addGroup();
        formArray.push(this.createFormGroup(groupModel.group, null, groupModel));
    }

    insertFormArrayGroup(index: number, formArray: FormArray, model: FormioFormArrayModel): void {
        let groupModel = model.insertGroup(index);
        formArray.insert(index, this.createFormGroup(groupModel.group, null, groupModel));
    }

    moveFormArrayGroup(index: number, step: number, formArray: FormArray, model: FormioFormArrayModel): void {
        let newIndex = index + step,
            moveUp = step >= 0;
        if ((index >= 0 && index < model.size) && (newIndex >= 0 && newIndex < model.size)) {
            let movingGroups: AbstractControl[] = [];
            for (let i = moveUp ? index : newIndex; i <= (moveUp ? newIndex : index); i++) {
                movingGroups.push(formArray.at(i));
            }
            movingGroups.forEach((formControl, idx) => {
                let position;
                if (moveUp) {
                    position = idx === 0 ? newIndex : index + idx - 1;
                } else {
                    position = idx === movingGroups.length - 1 ? newIndex : newIndex + idx + 1;
                }
                formArray.setControl(position, formControl);
            });
            model.moveGroup(index, step);
        } else {
            throw new Error(`form array group cannot be moved due to index or new index being out of bounds`);
        }
    }

    removeFormArrayGroup(index: number, formArray: FormArray, model: FormioFormArrayModel): void {
        formArray.removeAt(index);
        model.removeGroup(index);
    }

    clearFormArray(formArray: FormArray, model: FormioFormArrayModel): void {
        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, model);
        }
    }

    findById(id: string, groupModel: FormioFormControlModel[]): FormioFormControlModel | null {
        let result = null,
            findByIdFn = (id: string, groupModel: FormioFormControlModel[]): void => {
                for (let controlModel of groupModel) {
                    if (controlModel.id === id) {
                        result = controlModel;
                        break;
                    }
                    if (controlModel instanceof FormioFormGroupModel) {
                        findByIdFn(id, (controlModel as FormioFormGroupModel).group);
                    }
                }
            };
        findByIdFn(id, groupModel);
        return result;
    }

    fromJSON(json: string | Object[]): FormioFormControlModel[] | never {
        let raw = Utils.isString(json) ? JSON.parse(json as string, Utils.parseJSONReviver) : json,
            group: FormioFormControlModel[] = [];
        raw.forEach((model: any) => {
            switch (model.type) {
                case FORMIO_FORM_CONTROL_TYPE_ARRAY:
                    let formArrayModel = model as FormioFormArrayModel;
                    formArrayModel.groups.forEach((groupModel: FormioFormArrayGroupModel) => {
                        groupModel.group = this.fromJSON(groupModel.group) as FormioFormControlModel[];
                    });
                    formArrayModel.groupFactory = () => {
                        return this.fromJSON(formArrayModel.groupPrototype || formArrayModel.origin);
                    };
                    group.push(new FormioFormArrayModel(formArrayModel, formArrayModel.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_CHECKBOX:
                    group.push(new FormioCheckboxModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    model.group = this.fromJSON(model.group) as FormioCheckboxModel[];
                    group.push(new FormioCheckboxGroupModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_DATEPICKER:
                    group.push(new FormioDatePickerModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_EDITOR:
                    group.push(new FormioEditorModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_FILE_UPLOAD:
                    model.value = null;
                    group.push(new FormioFileUploadModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_GROUP:
                    model.group = this.fromJSON(model.group);
                    group.push(new FormioFormGroupModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_INPUT:
                    let inputModel = model as FormioInputModel;
                    if (inputModel.mask !== null) {
                        inputModel.mask = Utils.maskFromString(inputModel.mask as string);
                    }
                    group.push(new FormioInputModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP:
                    group.push(new FormioRadioGroupModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_RATING:
                    group.push(new FormioRatingModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_SELECT:
                    group.push(new FormioSelectModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_SLIDER:
                    group.push(new FormioSliderModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_SWITCH:
                    group.push(new FormioSwitchModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_TEXTAREA:
                    group.push(new FormioTextAreaModel(model, model.cls));
                    break;
                case FORMIO_FORM_CONTROL_TYPE_TIMEPICKER:
                    group.push(new FormioTimePickerModel(model, model.cls));
                    break;
                default:
                    throw new Error(`unknown form control model type defined on JSON object with id "${model.id}"`);
            }
        });
        return group;
    }
}
