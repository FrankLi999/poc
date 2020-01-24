import { Injectable } from "@angular/core";
import { 
  FormBuilder,
  AbstractControl,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";

import {
    ComponentModel, 
} from "../model/form/formio-component.model";
import { 
    FormModel,
    
    FORMIO_COMPONENT_TYPE_DATAGRID,
    FORMIO_COMPONENT_TYPE_GROUP,
    FORMIO_COMPONENT_TYPE_CONTENT,
    FORMIO_COMPONENT_TYPE_HTMLELEMENT,
    FORMIO_COMPONENT_TYPE_BUTTON,
    FORMIO_COMPONENT_TYPE_RESOURCE,
    
    FORMIO_COMPONENT_TYPE_FORM,
    FORMIO_COMPONENT_TYPE_COLUMNS,
    FORMIO_COMPONENT_TYPE_TABLE,

    FORMIO_COMPONENT_TYPE_CONTAINER,
    FORMIO_COMPONENT_TYPE_WELL,
    FORMIO_COMPONENT_TYPE_PANEL,
    FORMIO_COMPONENT_TYPE_FIELDSET,   

    FORMIO_COMPONENT_TYPE_SELECTBOXES,
    FORMIO_COMPONENT_TYPE_ADDRESS,
    
    FORMIO_COMPONENT_TYPE_TEXTFIELD,
    FORMIO_COMPONENT_TYPE_NUMBER,
    FORMIO_COMPONENT_TYPE_CHECKBOX,
    FORMIO_COMPONENT_TYPE_EMAIL,
    FORMIO_COMPONENT_TYPE_PHONENUMBER,
    FORMIO_COMPONENT_TYPE_SUERVEY,
    FORMIO_COMPONENT_TYPE_SIGNATURE,
    FORMIO_COMPONENT_TYPE_PASSWORD,
    FORMIO_COMPONENT_TYPE_DAY,
    FORMIO_COMPONENT_TYPE_TEXTAREA,
    FORMIO_COMPONENT_TYPE_RADIO,
    FORMIO_COMPONENT_TYPE_CURRENCY,
    FORMIO_COMPONENT_TYPE_SELECT,
    FORMIO_COMPONENT_TYPE_DATETIME,
    FORMIO_COMPONENT_TYPE_HIDDEN
} from "../model/form/formio-form.model";

import {
  FormioFormValidationService
} from './formio-form-validation.service';
@Injectable()
export class FormioFormService {
    constructor(
        private validationService: FormioFormValidationService,
        private formBuilder: FormBuilder) {}

    createExtra(componentModel: ComponentModel): { [key: string]: any } {
        return {
             validator: this.validationService.getValidator(componentModel.validate),
             asyncValidator: this.validationService.getAsyncValidator(componentModel.asyncValidate)
        };
    }

    createFormArray(datagridModel: ComponentModel): FormArray {
        const components: Array<ComponentModel> = datagridModel.components;
        let formArray = [];
        for (let i = 0; i < datagridModel.numRows; i++) {
            let formGroup: { [id: string]: AbstractControl; } = {};  
            for (let index = 0; index < components.length; index++) {
                let componnentModel = components[index],
                    extra = this.createExtra(componnentModel);
                this.createFormGroupControl(formGroup, componnentModel, extra);
            }
            formArray.push(this.formBuilder.group(formGroup));
        }
        return this.formBuilder.array(
            formArray
        );
    }

    createGroup(components: Array<ComponentModel>): FormGroup {
        let formGroup: { [id: string]: AbstractControl; } = {};  
        for (let index = 0; index < components.length; index++) {
            let componnentModel = components[index],
                extra = this.createExtra(componnentModel);
            this.createFormGroupControl(formGroup, componnentModel, extra);
        }
        return this.formBuilder.group(formGroup);
    }
    createForm(formModel: FormModel,
            extra: { [key: string]: any } | null = null): FormGroup {
        let formGroup: { [id: string]: AbstractControl; } = {};        
        formModel.components.forEach(componentModel => {
            this.createFormGroupControl(formGroup, componentModel);
        });
        return this.formBuilder.group(formGroup, extra);
    }

    createFormGroup(componentModels: Array<ComponentModel>,
        extra: { [key: string]: any } | null = null): FormGroup {
        let formGroup: { [id: string]: AbstractControl; } = {};        
        componentModels.forEach(componentModel => {
            let control = this.createFormGroupControl(formGroup, componentModel);
        });
        return this.formBuilder.group(formGroup, extra);
    }

    createFormGroupControl(formGroup: { [id: string]: AbstractControl; }, 
            componentModel: ComponentModel,
            extra: { [key: string]: any } | null = null): void {
        let control: AbstractControl = null;
        if (componentModel.input) {
            let formControlModel = componentModel as ComponentModel;
            control = new FormControl(
                {
                    value: formControlModel.defaultValue? formControlModel.defaultValue : '',
                    disabled: formControlModel.disabled
                },
                this.validationService.getValidators(formControlModel.validate),
                this.validationService.getAsyncValidators(formControlModel.asyncValidate)
            );
            formGroup[componentModel.key] = control;
            
        } else if (componentModel.type === FORMIO_COMPONENT_TYPE_DATAGRID) {
            control = this.createFormArray(componentModel);
            formGroup[componentModel.key] = control;
        } else if (componentModel.type === FORMIO_COMPONENT_TYPE_GROUP) {
            let formGroupModel = componentModel.components ,
                extra = this.createExtra(componentModel);
            control = this.createFormGroup(formGroupModel, extra);
            formGroup[componentModel.key] = control;
        }  else if (componentModel.components) {
            componentModel.components.forEach(model => {
                this.createFormGroupControl(formGroup, model);
            });
        } else if (componentModel.columns) {
            componentModel.columns.forEach(model => {
                this.createFormGroupControl(formGroup, model);
            });
        }
    }
}