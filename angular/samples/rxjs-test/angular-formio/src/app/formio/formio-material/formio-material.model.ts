import { Type } from '@angular/core';

import { MatFormControlType } from './formio-material-form.const';
import {
  FormioMaterialControlArrayComponent
} from './formio-material-control-array/formio-material-control-array.component';
import {
  FormioMaterialCheckboxComponent
} from "./formio-material-checkbox/formio-material-checkbox.component";  
import {  
  FormioMaterialDatePickerComponent
} from "./formio-material-date-picker/formio-material-date-picker.component";  
import {    
  FormioMaterialFieldsetComponent
} from "./formio-material-fieldset/formio-material-fieldset.component";    
import {  
  FormioMaterialInputComponent
} from "./formio-material-input/formio-material-input.component";    
import {    
  FormioMaterialRadioGroupComponent
} from "./formio-material-radio-group/formio-material-radio-group.component";    
import {    
  FormioMaterialSelectComponent
} from "./formio-material-select/formio-material-select.component";    
import {  
  FormioMaterialSliderComponent
} from "./formio-material-slider/formio-material-slider.component";    
import {  
  FormioMaterialSlideToggleComponent,
} from "./formio-material-slide-toggle/formio-material-slide-toggle.component";  
import {  
  FormioMaterialTextareaComponent
} from "./formio-material-textarea/formio-material-textarea.component";

export const MaterialComponentTypes: { [key: string]: Type<any> } = {};
MaterialComponentTypes[MatFormControlType.Array]       = FormioMaterialControlArrayComponent;
MaterialComponentTypes[MatFormControlType.Checkbox]    = FormioMaterialCheckboxComponent;
MaterialComponentTypes[MatFormControlType.DatePicker]  = FormioMaterialDatePickerComponent;
MaterialComponentTypes[MatFormControlType.Group]       = FormioMaterialFieldsetComponent;
MaterialComponentTypes[MatFormControlType.Input]       = FormioMaterialInputComponent;
MaterialComponentTypes[MatFormControlType.RadioGroup]  = FormioMaterialRadioGroupComponent;
MaterialComponentTypes[MatFormControlType.Select]      = FormioMaterialSelectComponent;
MaterialComponentTypes[MatFormControlType.Slider]      = FormioMaterialSliderComponent;
MaterialComponentTypes[MatFormControlType.SlideToggle] = FormioMaterialSlideToggleComponent;
MaterialComponentTypes[MatFormControlType.TextArea]    = FormioMaterialTextareaComponent;
