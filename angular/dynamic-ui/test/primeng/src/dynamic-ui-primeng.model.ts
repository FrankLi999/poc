import { Type } from '@angular/core';

import { PrimeNGFormControlType } from './dynamic-ui-primeng-form.const';
import {
  DynamicUIPrimengRadioGroupComponent
} from './dynamic-ui-primeng-radio-group/dynamic-ui-primeng-radio-group.component';
import {
  DynamicUIPrimengAutocompleteComponent
} from './dynamic-ui-primeng-autocomplete/dynamic-ui-primeng.autocomplete.component';
import {
  DynamicUIPrimengCalendarComponent
} from './dynamic-ui-primeng-calendar/dynamic-ui-primeng-calendar.component';
import {
  DynamicUIPrimengCheckboxComponent
} from './dynamic-ui-primeng-checkbox/dynamic-ui-primeng-checkbox.component';
import {
  DynamicUIPrimengChipsComponent
} from './dynamic-ui-primeng-chips/dynamic-ui-primeng-chips.component';
import {
  DynamicUIPrimengControlArrayComponent
} from './dynamic-ui-primeng-control-array/dynamic-ui-primeng-control-array.component';
import {
  DynamicUIPrimengDropdownComponent
} from './dynamic-ui-primeng-dropdown/dynamic-ui-primeng-dropdown.component';
import {
  DynamicUIPrimengEditorComponent
} from './dynamic-ui-primeng-editor/dynamic-ui-primeng-editor.component';
import {
  DynamicUIPrimengFieldsetComponent
} from './dynamic-ui-primeng-fieldset/dynamic-ui-primeng-fieldset.component';
import {
  DynamicUIPrimengInputComponent
} from './dynamic-ui-primeng-input/dynamic-ui-primeng-input.component';
import {
  DynamicUIPrimengInputSwitchComponent
} from './dynamic-ui-primeng-input-switch/dynamic-ui-primeng-input-switch.component';
import {
  DynamicUIPrimengMultiSelectComponent
} from './dynamic-ui-primeng-multi-select/dynamic-ui-primeng-multi-select.component';
import {
  DynamicUIPrimengRatingComponent
} from './dynamic-ui-primeng-rating/dynamic-ui-primeng-rating.component';
import {
  DynamicUIPrimengSliderComponent
} from './dynamic-ui-primeng-slider/dynamic-ui-primeng-slider.component';
import {
  DynamicUIPrimengTextareaComponent
} from "./dynamic-ui-primeng-textarea/dynamic-ui-primeng-textarea.component";
import {
  DynamicUIPrimengDatagridComponent
} from "./dynamic-ui-primeng-datagrid/dynamic-ui-primeng-datagrid.component";
import {
  DynamicUIPrimengColumnsComponent
} from "./dynamic-ui-primeng-columns/dynamic-ui-primeng-columns.component";
import {
  DynamicUIPrimengFormGroupComponent
} from "./dynamic-ui-primeng-form-group/dynamic-ui-primeng-form-group.component";

export const PrimengComponentTypes: { [key: string]: Type<any> } = {};
PrimengComponentTypes[PrimeNGFormControlType.Array]        = DynamicUIPrimengDatagridComponent; // DynamicUIPrimengControlArrayComponent;
PrimengComponentTypes[PrimeNGFormControlType.AutoComplete] = DynamicUIPrimengAutocompleteComponent;
PrimengComponentTypes[PrimeNGFormControlType.Calendar]     = DynamicUIPrimengCalendarComponent;
PrimengComponentTypes[PrimeNGFormControlType.Checkbox]     = DynamicUIPrimengCheckboxComponent;
PrimengComponentTypes[PrimeNGFormControlType.Chips]        = DynamicUIPrimengChipsComponent;
PrimengComponentTypes[PrimeNGFormControlType.Dropdown]     = DynamicUIPrimengDropdownComponent;
PrimengComponentTypes[PrimeNGFormControlType.Editor]       = DynamicUIPrimengEditorComponent;
PrimengComponentTypes[PrimeNGFormControlType.Group]        = DynamicUIPrimengFormGroupComponent; // DynamicUIPrimengFieldsetComponent;
PrimengComponentTypes[PrimeNGFormControlType.Input]        = DynamicUIPrimengInputComponent;
PrimengComponentTypes[PrimeNGFormControlType.InputSwitch]  = DynamicUIPrimengInputSwitchComponent;
PrimengComponentTypes[PrimeNGFormControlType.MultiSelect]  = DynamicUIPrimengMultiSelectComponent;
PrimengComponentTypes[PrimeNGFormControlType.RadioGroup]   = DynamicUIPrimengRadioGroupComponent;
PrimengComponentTypes[PrimeNGFormControlType.Rating]       = DynamicUIPrimengRatingComponent;
PrimengComponentTypes[PrimeNGFormControlType.Slider]       = DynamicUIPrimengSliderComponent;
PrimengComponentTypes[PrimeNGFormControlType.TextArea]     = DynamicUIPrimengTextareaComponent;
PrimengComponentTypes[PrimeNGFormControlType.Columns]      = DynamicUIPrimengColumnsComponent;
