import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule
} from "@angular/material";
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2FontawesomeModule } from 'angular2-fontawesome'

import { DynamicUIBaseModule } from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "./dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import { DynamicUIMaterialFormComponent } from "./dynamic-ui-material-form/dynamic-ui-material-form.component";
import { DynamicUIMaterialFormGroupComponent } from "./dynamic-ui-material-form-group/dynamic-ui-material-form-group.component";
import { DynamicUIMaterialControlArrayComponent } from './dynamic-ui-material-control-array/dynamic-ui-material-control-array.component';
import { DynamicUIMaterialCheckboxComponent } from './dynamic-ui-material-checkbox/dynamic-ui-material-checkbox.component';
import { DynamicUIMaterialDatePickerComponent } from './dynamic-ui-material-date-picker/dynamic-ui-material-date-picker.component';
import { DynamicUIMaterialFieldsetComponent } from './dynamic-ui-material-fieldset/dynamic-ui-material-fieldset.component';
import { DynamicUIMaterialInputComponent } from './dynamic-ui-material-input/dynamic-ui-material-input.component';
import { DynamicUIMaterialRadioGroupComponent } from './dynamic-ui-material-radio-group/dynamic-ui-material-radio-group.component';
import { DynamicUIMaterialSelectComponent } from './dynamic-ui-material-select/dynamic-ui-material-select.component';
import { DynamicUIMaterialSliderComponent } from './dynamic-ui-material-slider/dynamic-ui-material-slider.component';
import { DynamicUIMaterialControlComponent } from './dynamic-ui-material-control/dynamic-ui-material-control.component';
import { DynamicUIMaterialTextareaComponent } from './dynamic-ui-material-textarea/dynamic-ui-material-textarea.component';
import { DynamicUIMaterialSlideToggleComponent } from './dynamic-ui-material-slide-toggle/dynamic-ui-material-slide-toggle.component';
import { DynamicUIMaterialColumnsComponent } from './dynamic-ui-material-columns/dynamic-ui-material-columns.component';
import { DynamicUIMaterialDatagridComponent } from './dynamic-ui-material-datagrid/dynamic-ui-material-datagrid.component';
import { DynamicUIMaterialDynamicComponent } from './dynamic-ui-material-dynamic/dynamic-ui-material-dynamic.component';
import { DynamicUIMaterialCompositeComponent } from './dynamic-ui-material-composite/dynamic-ui-material-composite.component';
@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        Angular2FontawesomeModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        DynamicUIBaseModule
    ],
    declarations: [
        DynamicUIMaterialFormControlComponent,
        DynamicUIMaterialControlArrayComponent,
        DynamicUIMaterialCheckboxComponent,
        DynamicUIMaterialDatePickerComponent,
        DynamicUIMaterialFieldsetComponent,
        DynamicUIMaterialInputComponent,
        DynamicUIMaterialRadioGroupComponent,
        DynamicUIMaterialSelectComponent,
        DynamicUIMaterialSliderComponent,
        DynamicUIMaterialTextareaComponent,
        DynamicUIMaterialControlComponent,
        DynamicUIMaterialSlideToggleComponent,
        DynamicUIMaterialFormComponent,
        DynamicUIMaterialFormGroupComponent,
        DynamicUIMaterialColumnsComponent,
        DynamicUIMaterialDatagridComponent,
        DynamicUIMaterialDynamicComponent,
        DynamicUIMaterialCompositeComponent
    ],
    exports: [
        DynamicUIMaterialFormControlComponent,
        DynamicUIMaterialControlArrayComponent,
        DynamicUIMaterialCheckboxComponent,
        DynamicUIMaterialDatePickerComponent,
        DynamicUIMaterialFieldsetComponent,
        DynamicUIMaterialInputComponent,
        DynamicUIMaterialRadioGroupComponent,
        DynamicUIMaterialSelectComponent,
        DynamicUIMaterialSliderComponent,
        DynamicUIMaterialSlideToggleComponent,
        DynamicUIMaterialTextareaComponent,
        DynamicUIMaterialControlComponent,
        DynamicUIMaterialFormComponent,
        DynamicUIMaterialFormGroupComponent,
        DynamicUIMaterialColumnsComponent,
        DynamicUIMaterialDatagridComponent,
        DynamicUIMaterialDynamicComponent,
        DynamicUIMaterialCompositeComponent
    ],
    entryComponents: [
        DynamicUIMaterialFormControlComponent,
        DynamicUIMaterialControlArrayComponent,
        DynamicUIMaterialCheckboxComponent,
        DynamicUIMaterialDatePickerComponent,
        DynamicUIMaterialFieldsetComponent,
        DynamicUIMaterialInputComponent,
        DynamicUIMaterialRadioGroupComponent,
        DynamicUIMaterialSelectComponent,
        DynamicUIMaterialSliderComponent,
        DynamicUIMaterialSlideToggleComponent,
        DynamicUIMaterialTextareaComponent,
        DynamicUIMaterialControlComponent,
        DynamicUIMaterialFormComponent,
        DynamicUIMaterialFormGroupComponent,
        DynamicUIMaterialColumnsComponent,
        DynamicUIMaterialDatagridComponent,
        DynamicUIMaterialCompositeComponent
    ]
})
export class DynamicUIMaterialModule {
}
