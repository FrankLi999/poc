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
} from "../model/form/component.model";
import { 
    FormModel,
    
    DYNAMIC_UI_COMPONENT_TYPE_DATAGRID,
    DYNAMIC_UI_COMPONENT_TYPE_GROUP,
    DYNAMIC_UI_COMPONENT_TYPE_CONTENT,
    DYNAMIC_UI_COMPONENT_TYPE_HTMLELEMENT,
    DYNAMIC_UI_COMPONENT_TYPE_BUTTON,
    DYNAMIC_UI_COMPONENT_TYPE_RESOURCE,
    
    DYNAMIC_UI_COMPONENT_TYPE_FORM,
    DYNAMIC_UI_COMPONENT_TYPE_COLUMNS,
    DYNAMIC_UI_COMPONENT_TYPE_TABLE,

    DYNAMIC_UI_COMPONENT_TYPE_CONTAINER,
    DYNAMIC_UI_COMPONENT_TYPE_WELL,
    DYNAMIC_UI_COMPONENT_TYPE_PANEL,
    DYNAMIC_UI_COMPONENT_TYPE_FIELDSET,   

    DYNAMIC_UI_COMPONENT_TYPE_SELECTBOXES,
    DYNAMIC_UI_COMPONENT_TYPE_ADDRESS,
    
    DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD,
    DYNAMIC_UI_COMPONENT_TYPE_NUMBER,
    DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX,
    DYNAMIC_UI_COMPONENT_TYPE_EMAIL,
    DYNAMIC_UI_COMPONENT_TYPE_PHONENUMBER,
    DYNAMIC_UI_COMPONENT_TYPE_SUERVEY,
    DYNAMIC_UI_COMPONENT_TYPE_SIGNATURE,
    DYNAMIC_UI_COMPONENT_TYPE_PASSWORD,
    DYNAMIC_UI_COMPONENT_TYPE_DAY,
    DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA,
    DYNAMIC_UI_COMPONENT_TYPE_RADIO,
    DYNAMIC_UI_COMPONENT_TYPE_CURRENCY,
    DYNAMIC_UI_COMPONENT_TYPE_SELECT,
    DYNAMIC_UI_COMPONENT_TYPE_DATETIME,
    DYNAMIC_UI_COMPONENT_TYPE_HIDDEN
} from "../model/form/form.model";
import {
  DynamicUIFormValidationService
} from './dynamic-ui-form-validation.service';

@Injectable()
export class DynamicUIFormService {
    constructor(
        private validationService: DynamicUIFormValidationService,
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
            
        } else if (componentModel.type === DYNAMIC_UI_COMPONENT_TYPE_DATAGRID) {
            control = this.createFormArray(componentModel);
            formGroup[componentModel.key] = control;
        } else if (componentModel.type === DYNAMIC_UI_COMPONENT_TYPE_GROUP) {
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