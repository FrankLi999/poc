import { Type } from '@angular/core';

import {
  DynamicUIBasicControlArrayComponent,
} from "./dynamic-ui-basic-control-array/dynamic-ui-basic-control-array.component";
import {
  DynamicUIBasicCheckboxComponent,
} from "./dynamic-ui-basic-checkbox/dynamic-ui-basic-checkbox.component";
import {
  DynamicUIBasicFieldsetComponent,
} from "./dynamic-ui-basic-fieldset/dynamic-ui-basic-fieldset.component";
import {
  DynamicUIBasicInputComponent,
} from "./dynamic-ui-basic-input/dynamic-ui-basic-input.component";
import {
  DynamicUIBasicRadioGroupComponent,
} from "./dynamic-ui-basic-radio-group/dynamic-ui-basic-radio-group.component";
import {
  DynamicUIBasicSelectComponent,
} from "./dynamic-ui-basic-select/dynamic-ui-basic-select.component";
import {
  DynamicUIBasicTextareaComponent,
} from "./dynamic-ui-basic-textarea/dynamic-ui-basic-textarea.component";
import {
  DynamicUIBasicColumnsComponent,
} from "./dynamic-ui-basic-columns/dynamic-ui-basic-columns.component";
import {
  DynamicUIBasicDatagridComponent,
} from "./dynamic-ui-basic-datagrid/dynamic-ui-basic-datagrid.component";
import {
  DynamicUIBasicFormGroupComponent
} from "./dynamic-ui-basic-form-group/dynamic-ui-basic-form-group.component";
import {
  DynamicUIBasicFormControlType
} from "./dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";

export const DynamicUIBasicComponentTypes: { [key: string]: Type<any> } = {};
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Array]       = DynamicUIBasicDatagridComponent; // DynamicUIBasicControlArrayComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Checkbox]    = DynamicUIBasicCheckboxComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Group]       = DynamicUIBasicFormGroupComponent; // DynamicUIBasicFieldsetComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Input]       = DynamicUIBasicInputComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.RadioGroup]  = DynamicUIBasicRadioGroupComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Select]      = DynamicUIBasicSelectComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.TextArea]    = DynamicUIBasicTextareaComponent;
DynamicUIBasicComponentTypes[DynamicUIBasicFormControlType.Columns]     = DynamicUIBasicColumnsComponent;
