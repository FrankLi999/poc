import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { DynamicUIBaseModule } from "@bpw-ui/base";
import { DynamicUIBasicFormControlComponent } from "./dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import { DynamicUIBasicFormComponent } from "./dynamic-ui-basic-form/dynamic-ui-basic-form.component";
import { DynamicUIBasicFormGroupComponent } from "./dynamic-ui-basic-form-group/dynamic-ui-basic-form-group.component";
import { DynamicUIBasicColumnsComponent } from "./dynamic-ui-basic-columns/dynamic-ui-basic-columns.component";
import { DynamicUIBasicDatagridComponent } from "./dynamic-ui-basic-datagrid/dynamic-ui-basic-datagrid.component";
import { DynamicUIBasicControlArrayComponent } from './dynamic-ui-basic-control-array/dynamic-ui-basic-control-array.component';
import { DynamicUIBasicCheckboxComponent } from './dynamic-ui-basic-checkbox/dynamic-ui-basic-checkbox.component';
import { DynamicUIBasicControlComponent } from './dynamic-ui-basic-control/dynamic-ui-basic-control.component';
import { DynamicUIBasicFieldsetComponent } from './dynamic-ui-basic-fieldset/dynamic-ui-basic-fieldset.component';
import { DynamicUIBasicInputComponent } from './dynamic-ui-basic-input/dynamic-ui-basic-input.component';
import { DynamicUIBasicRadioGroupComponent } from './dynamic-ui-basic-radio-group/dynamic-ui-basic-radio-group.component';
import { DynamicUIBasicSelectComponent } from './dynamic-ui-basic-select/dynamic-ui-basic-select.component';
import { DynamicUIBasicTextareaComponent } from './dynamic-ui-basic-textarea/dynamic-ui-basic-textarea.component';
import { DynamicUIBasicDynamicComponent } from './dynamic-ui-basic-dynamic/dynamic-ui-basic-dynamic.component';
import { DynamicUIBasicCompositeComponent } from '././dynamic-ui-basic-composite/dynamic-ui-basic-composite.component';
@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        DynamicUIBaseModule,
        FlexLayoutModule,
        Angular2FontawesomeModule
    ],
    declarations: [
        DynamicUIBasicFormControlComponent,
        DynamicUIBasicControlArrayComponent,
        DynamicUIBasicCheckboxComponent,
        DynamicUIBasicControlComponent,
        DynamicUIBasicFieldsetComponent,
        DynamicUIBasicInputComponent,
        DynamicUIBasicRadioGroupComponent,
        DynamicUIBasicSelectComponent,
        DynamicUIBasicTextareaComponent,
        DynamicUIBasicFormComponent,
        DynamicUIBasicFormGroupComponent,
        DynamicUIBasicColumnsComponent,
        DynamicUIBasicDatagridComponent,
        DynamicUIBasicDynamicComponent,
        DynamicUIBasicCompositeComponent
    ],
    exports: [
        DynamicUIBasicFormControlComponent,
        DynamicUIBasicControlArrayComponent,
        DynamicUIBasicCheckboxComponent,
        DynamicUIBasicControlComponent,
        DynamicUIBasicFieldsetComponent,
        DynamicUIBasicInputComponent,
        DynamicUIBasicRadioGroupComponent,
        DynamicUIBasicSelectComponent,
        DynamicUIBasicTextareaComponent,
        DynamicUIBasicFormComponent,
        DynamicUIBasicFormGroupComponent,
        DynamicUIBasicColumnsComponent,
        DynamicUIBasicDatagridComponent,
        DynamicUIBasicDynamicComponent,
        DynamicUIBasicCompositeComponent
    ],
    entryComponents: [
      DynamicUIBasicControlArrayComponent,
      DynamicUIBasicCheckboxComponent,
      DynamicUIBasicFieldsetComponent,
      DynamicUIBasicInputComponent,
      DynamicUIBasicRadioGroupComponent,
      DynamicUIBasicSelectComponent,
      DynamicUIBasicTextareaComponent,
      DynamicUIBasicFormComponent,
      DynamicUIBasicFormGroupComponent,
      DynamicUIBasicColumnsComponent,
      DynamicUIBasicDatagridComponent,
      DynamicUIBasicCompositeComponent
    ]
})

export class DynamicUIBasicModule {
}
