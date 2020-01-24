import { Type } from '@angular/core';

import {
  FormioBasicControlArrayComponent,
} from "./formio-basic-control-array/formio-basic-control-array.component";  
import {
  FormioBasicCheckboxComponent,
} from "./formio-basic-checkbox/formio-basic-checkbox.component";  
import {
  FormioBasicFieldsetComponent,
} from "./formio-basic-fieldset/formio-basic-fieldset.component";  
import {
  FormioBasicInputComponent,
} from "./formio-basic-input/formio-basic-input.component";  
import {
  FormioBasicRadioGroupComponent,
} from "./formio-basic-radio-group/formio-basic-radio-group.component";  
import {
  FormioBasicSelectComponent,
} from "./formio-basic-select/formio-basic-select.component"; 
import { 
  FormioBasicTextareaComponent,
} from "./formio-basic-textarea/formio-basic-textarea.component";  
import {
  FormioBasicFormControlType
} from "./formio-basic-form-control.component";

export const FormioBasicComponentTypes: { [key: string]: Type<any> } = {};
FormioBasicComponentTypes[FormioBasicFormControlType.Array]       = FormioBasicControlArrayComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.Checkbox]    = FormioBasicCheckboxComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.Group]       = FormioBasicFieldsetComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.Input]       = FormioBasicInputComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.RadioGroup]  = FormioBasicRadioGroupComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.Select]      = FormioBasicSelectComponent;
FormioBasicComponentTypes[FormioBasicFormControlType.TextArea]    = FormioBasicTextareaComponent;
