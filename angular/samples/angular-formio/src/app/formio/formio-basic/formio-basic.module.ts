import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { FormioFormsCoreModule } from "../formio-core";
import { FormioBasicFormControlComponent } from "./formio-basic-form-control.component";
import { FormioBasicFormComponent } from "./formio-basic-form.component";
import { FormioBasicFormGroupComponent } from "./formio-basic-form-group.component";
import { FormioBasicColumnsComponent } from "./formio-basic-columns/formio-basic-columns.component";
import { FormioBasicDatagridComponent } from "./formio-basic-datagrid/formio-basic-datagrid.component";
import { FormioBasicControlArrayComponent } from './formio-basic-control-array/formio-basic-control-array.component';
import { FormioBasicCheckboxComponent } from './formio-basic-checkbox/formio-basic-checkbox.component';
import { FormioBasicControlComponent } from './formio-basic-control/formio-basic-control.component';
import { FormioBasicFieldsetComponent } from './formio-basic-fieldset/formio-basic-fieldset.component';
import { FormioBasicInputComponent } from './formio-basic-input/formio-basic-input.component';
import { FormioBasicRadioGroupComponent } from './formio-basic-radio-group/formio-basic-radio-group.component';
import { FormioBasicSelectComponent } from './formio-basic-select/formio-basic-select.component';
import { FormioBasicTextareaComponent } from './formio-basic-textarea/formio-basic-textarea.component';

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        FormioFormsCoreModule,
        FlexLayoutModule,
        Angular2FontawesomeModule
    ],
    declarations: [
        FormioBasicFormControlComponent,
        FormioBasicControlArrayComponent,
        FormioBasicCheckboxComponent,
        FormioBasicControlComponent,
        FormioBasicFieldsetComponent,
        FormioBasicInputComponent,
        FormioBasicRadioGroupComponent,
        FormioBasicSelectComponent,
        FormioBasicTextareaComponent,
        FormioBasicFormComponent,
        FormioBasicFormGroupComponent,
        FormioBasicColumnsComponent,
        FormioBasicDatagridComponent
    ],
    exports: [
        FormioFormsCoreModule,
        FormioBasicFormControlComponent,
        FormioBasicControlArrayComponent,
        FormioBasicCheckboxComponent,
        FormioBasicControlComponent,
        FormioBasicFieldsetComponent,
        FormioBasicInputComponent,
        FormioBasicRadioGroupComponent,
        FormioBasicSelectComponent,
        FormioBasicTextareaComponent,
        FormioBasicFormComponent,
        FormioBasicFormGroupComponent,
        FormioBasicColumnsComponent,
        FormioBasicDatagridComponent
    ],
    entryComponents: [
      FormioBasicControlArrayComponent,
      FormioBasicCheckboxComponent,
      FormioBasicFieldsetComponent,
      FormioBasicInputComponent,
      FormioBasicRadioGroupComponent,
      FormioBasicSelectComponent,
      FormioBasicTextareaComponent,
      FormioBasicFormComponent,
      FormioBasicFormGroupComponent,
      FormioBasicColumnsComponent,
      FormioBasicDatagridComponent
    ]
})

export class FormioFormsBasicUIModule {
}