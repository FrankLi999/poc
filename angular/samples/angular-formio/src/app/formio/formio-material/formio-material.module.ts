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
import { FormioFormsCoreModule } from "../formio-core";
import { FormioMaterialFormControlComponent } from "./formio-material-form-control.component";
import { FormioMaterialFormComponent } from "./formio-material-form.component";
import { FormioMaterialControlArrayComponent } from './formio-material-control-array/formio-material-control-array.component';
import { FormioMaterialCheckboxComponent } from './formio-material-checkbox/formio-material-checkbox.component';
import { FormioMaterialDatePickerComponent } from './formio-material-date-picker/formio-material-date-picker.component';
import { FormioMaterialFieldsetComponent } from './formio-material-fieldset/formio-material-fieldset.component';
import { FormioMaterialInputComponent } from './formio-material-input/formio-material-input.component';
import { FormioMaterialRadioGroupComponent } from './formio-material-radio-group/formio-material-radio-group.component';
import { FormioMaterialSelectComponent } from './formio-material-select/formio-material-select.component';
import { FormioMaterialSliderComponent } from './formio-material-slider/formio-material-slider.component';
import { FormioMaterialControlComponent } from './formio-material-control/formio-material-control.component';
import { FormioMaterialTextareaComponent } from './formio-material-textarea/formio-material-textarea.component';
import { FormioMaterialSlideToggleComponent } from './formio-material-slide-toggle/formio-material-slide-toggle.component';

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        FormioFormsCoreModule
    ],
    declarations: [
        FormioMaterialFormControlComponent,
        FormioMaterialControlArrayComponent,
        FormioMaterialCheckboxComponent,
        FormioMaterialDatePickerComponent,
        FormioMaterialFieldsetComponent,
        FormioMaterialInputComponent,
        FormioMaterialRadioGroupComponent,
        FormioMaterialSelectComponent,
        FormioMaterialSliderComponent,
        FormioMaterialTextareaComponent,
        FormioMaterialControlComponent,
        FormioMaterialSlideToggleComponent,
        FormioMaterialFormComponent
    ],
    exports: [
        FormioFormsCoreModule,
        FormioMaterialFormControlComponent,
        FormioMaterialControlArrayComponent,
        FormioMaterialCheckboxComponent,
        FormioMaterialDatePickerComponent,
        FormioMaterialFieldsetComponent,
        FormioMaterialInputComponent,
        FormioMaterialRadioGroupComponent,
        FormioMaterialSelectComponent,
        FormioMaterialSliderComponent,
        FormioMaterialSlideToggleComponent,
        FormioMaterialTextareaComponent,
        FormioMaterialControlComponent,
        FormioMaterialFormComponent
    ],
    entryComponents: [
        FormioMaterialFormControlComponent,
        FormioMaterialControlArrayComponent,
        FormioMaterialCheckboxComponent,
        FormioMaterialDatePickerComponent,
        FormioMaterialFieldsetComponent,
        FormioMaterialInputComponent,
        FormioMaterialRadioGroupComponent,
        FormioMaterialSelectComponent,
        FormioMaterialSliderComponent,
        FormioMaterialSlideToggleComponent,
        FormioMaterialTextareaComponent,
        FormioMaterialControlComponent,
        FormioMaterialFormComponent
    ]
})
export class FormioFormsMaterialUIModule {
}