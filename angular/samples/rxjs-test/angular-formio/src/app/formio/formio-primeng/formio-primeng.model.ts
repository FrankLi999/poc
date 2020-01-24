import { Type } from '@angular/core';

import { PrimeNGFormControlType } from './formio-primeng-form.const';
import {
  FormioPrimengRadioGroupComponent
} from './formio-primeng-radio-group/formio-primeng-radio-group.component';
import {
  FormioPrimengAutocompleteComponent
} from './formio-primeng-autocomplete/formio-primeng.autocomplete.component';
import {
  FormioPrimengCalendarComponent
} from './formio-primeng-calendar/formio-primeng-calendar.component';
import {
  FormioPrimengCheckboxComponent
} from './formio-primeng-checkbox/formio-primeng-checkbox.component';
import { 
  FormioPrimengChipsComponent
} from './formio-primeng-chips/formio-primeng-chips.component';
import {
  FormioPrimengControlArrayComponent
} from './formio-primeng-control-array/formio-primeng-control-array.component';  
import {
  FormioPrimengDropdownComponent
} from './formio-primeng-dropdown/formio-primeng-dropdown.component';
import {
  FormioPrimengEditorComponent
} from './formio-primeng-editor/formio-primeng-editor.component';
import { 
  FormioPrimengFieldsetComponent
} from './formio-primeng-fieldset/formio-primeng-fieldset.component';  
import {
  FormioPrimengInputControlComponent
} from './formio-primeng-input-control/formio-primeng-input-control.component';
import {   
  FormioPrimengInputComponent
} from './formio-primeng-input/formio-primeng-input.component';
import {   
  FormioPrimengInputSwitchComponent
} from './formio-primeng-input-switch/formio-primeng-input-switch.component';
import {   
  FormioPrimengMultiSelectComponent
} from './formio-primeng-multi-select/formio-primeng-multi-select.component';
import {   
  FormioPrimengRatingComponent
} from './formio-primeng-rating/formio-primeng-rating.component';
import {   
  FormioPrimengSliderComponent
} from './formio-primeng-slider/formio-primeng-slider.component';
import {   
  FormioPrimengTextareaComponent
} from "./formio-primeng-textarea/formio-primeng-textarea.component";

export const PrimengComponentTypes: { [key: string]: Type<any> } = {};
PrimengComponentTypes[PrimeNGFormControlType.Array]        = FormioPrimengControlArrayComponent;
PrimengComponentTypes[PrimeNGFormControlType.AutoComplete] = FormioPrimengAutocompleteComponent;
PrimengComponentTypes[PrimeNGFormControlType.Calendar]     = FormioPrimengCalendarComponent;
PrimengComponentTypes[PrimeNGFormControlType.Checkbox]     = FormioPrimengCheckboxComponent;
PrimengComponentTypes[PrimeNGFormControlType.Chips]        = FormioPrimengChipsComponent;
PrimengComponentTypes[PrimeNGFormControlType.Dropdown]     = FormioPrimengDropdownComponent;
PrimengComponentTypes[PrimeNGFormControlType.Editor]       = FormioPrimengEditorComponent;
PrimengComponentTypes[PrimeNGFormControlType.Group]        = FormioPrimengFieldsetComponent;
PrimengComponentTypes[PrimeNGFormControlType.Input]        = FormioPrimengInputComponent;
PrimengComponentTypes[PrimeNGFormControlType.InputSwitch]  = FormioPrimengInputSwitchComponent;
PrimengComponentTypes[PrimeNGFormControlType.MultiSelect]  = FormioPrimengMultiSelectComponent;
PrimengComponentTypes[PrimeNGFormControlType.RadioGroup]   = FormioPrimengRadioGroupComponent;
PrimengComponentTypes[PrimeNGFormControlType.Rating]       = FormioPrimengRatingComponent;
PrimengComponentTypes[PrimeNGFormControlType.Slider]       = FormioPrimengSliderComponent;
PrimengComponentTypes[PrimeNGFormControlType.TextArea]     = FormioPrimengTextareaComponent;

//PrimengComponentTypes['ui-article']             = ArticleMaterialComponent;
//PrimengComponentTypes['ui-section']             = SectionMasterialComponent;
//PrimengComponentTypes['ui-section-instruction'] = SectionInstructionMasterialComponent;
//PrimengComponentTypes['ui-section-actions']     = SectionActionMaterialComponent;
//PrimengComponentTypes['ui-html']                = HtmlMaterialComponent;
