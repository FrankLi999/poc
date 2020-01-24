import { Type } from '@angular/core';

import { MatFormControlType } from './dynamic-ui-material-form.const';
import {
  DynamicUIMaterialControlArrayComponent
} from './dynamic-ui-material-control-array/dynamic-ui-material-control-array.component';
import {
  DynamicUIMaterialCheckboxComponent
} from "./dynamic-ui-material-checkbox/dynamic-ui-material-checkbox.component";
import {
  DynamicUIMaterialDatePickerComponent
} from "./dynamic-ui-material-date-picker/dynamic-ui-material-date-picker.component";
import {
  DynamicUIMaterialFieldsetComponent
} from "./dynamic-ui-material-fieldset/dynamic-ui-material-fieldset.component";
import {
  DynamicUIMaterialInputComponent
} from "./dynamic-ui-material-input/dynamic-ui-material-input.component";
import {
  DynamicUIMaterialRadioGroupComponent
} from "./dynamic-ui-material-radio-group/dynamic-ui-material-radio-group.component";
import {
  DynamicUIMaterialSelectComponent
} from "./dynamic-ui-material-select/dynamic-ui-material-select.component";
import {
  DynamicUIMaterialSliderComponent
} from "./dynamic-ui-material-slider/dynamic-ui-material-slider.component";
import {
  DynamicUIMaterialSlideToggleComponent,
} from "./dynamic-ui-material-slide-toggle/dynamic-ui-material-slide-toggle.component";
import {
  DynamicUIMaterialTextareaComponent
} from "./dynamic-ui-material-textarea/dynamic-ui-material-textarea.component";
import {
  DynamicUIMaterialDatagridComponent
} from "./dynamic-ui-material-datagrid/dynamic-ui-material-datagrid.component";
import {
  DynamicUIMaterialColumnsComponent
} from "./dynamic-ui-material-columns/dynamic-ui-material-columns.component";
import {
  DynamicUIMaterialFormGroupComponent
} from "./dynamic-ui-material-form-group/dynamic-ui-material-form-group.component";
export const MaterialComponentTypes: { [key: string]: Type<any> } = {};
MaterialComponentTypes[MatFormControlType.Array]       = DynamicUIMaterialDatagridComponent; //DynamicUIMaterialControlArrayComponent;
MaterialComponentTypes[MatFormControlType.Checkbox]    = DynamicUIMaterialCheckboxComponent;
MaterialComponentTypes[MatFormControlType.DatePicker]  = DynamicUIMaterialDatePickerComponent;
MaterialComponentTypes[MatFormControlType.Group]       = DynamicUIMaterialFormGroupComponent; // DynamicUIMaterialFieldsetComponent;
MaterialComponentTypes[MatFormControlType.Input]       = DynamicUIMaterialInputComponent;
MaterialComponentTypes[MatFormControlType.RadioGroup]  = DynamicUIMaterialRadioGroupComponent;
MaterialComponentTypes[MatFormControlType.Select]      = DynamicUIMaterialSelectComponent;
MaterialComponentTypes[MatFormControlType.Slider]      = DynamicUIMaterialSliderComponent;
MaterialComponentTypes[MatFormControlType.SlideToggle] = DynamicUIMaterialSlideToggleComponent;
MaterialComponentTypes[MatFormControlType.TextArea]    = DynamicUIMaterialTextareaComponent;
MaterialComponentTypes[MatFormControlType.Columns]     = DynamicUIMaterialColumnsComponent;
