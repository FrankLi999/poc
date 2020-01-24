import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FormioFormsCoreModule} from "../formio-core";
import {FormioPrimengFormControlComponent} from "./formio-primeng-form-control.component";
import {FormioPrimengFormComponent} from "./formio-primeng-form.component";
import {
  AutoCompleteModule,
  CalendarModule,
  CheckboxModule,
  ChipsModule,
  DropdownModule,
  EditorModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  MultiSelectModule,
  RadioButtonModule,
  RatingModule,
  SliderModule,
  SpinnerModule
} from "primeng/primeng";

import {FormioPrimengRadioGroupComponent} from './formio-primeng-radio-group/formio-primeng-radio-group.component';
import {FormioPrimengAutocompleteComponent} from './formio-primeng-autocomplete/formio-primeng.autocomplete.component';
import {FormioPrimengCalendarComponent} from './formio-primeng-calendar/formio-primeng-calendar.component';
import {FormioPrimengCheckboxComponent} from './formio-primeng-checkbox/formio-primeng-checkbox.component';
import {FormioPrimengChipsComponent} from './formio-primeng-chips/formio-primeng-chips.component';
import {FormioPrimengControlArrayComponent} from './formio-primeng-control-array/formio-primeng-control-array.component';
import {FormioPrimengDropdownComponent} from './formio-primeng-dropdown/formio-primeng-dropdown.component';
import {FormioPrimengEditorComponent} from './formio-primeng-editor/formio-primeng-editor.component';
import {FormioPrimengFieldsetComponent} from './formio-primeng-fieldset/formio-primeng-fieldset.component';
import {FormioPrimengInputComponent} from './formio-primeng-input/formio-primeng-input.component';
import {FormioPrimengInputSwitchComponent} from './formio-primeng-input-switch/formio-primeng-input-switch.component';
import {FormioPrimengMultiSelectComponent} from './formio-primeng-multi-select/formio-primeng-multi-select.component';
import {FormioPrimengRatingComponent} from './formio-primeng-rating/formio-primeng-rating.component';
import {FormioPrimengSliderComponent} from './formio-primeng-slider/formio-primeng-slider.component';
import {FormioPrimengTextareaComponent} from './formio-primeng-textarea/formio-primeng-textarea.component';
import {FormioPrimengInputControlComponent} from './formio-primeng-input-control/formio-primeng-input-control.component';
import {FormioPrimengControlComponent} from './formio-primeng-control/formio-primeng-control.component';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormioFormsCoreModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    DropdownModule,
    EditorModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    SpinnerModule
  ],
  declarations: [
    FormioPrimengFormControlComponent,
    FormioPrimengRadioGroupComponent,
    FormioPrimengAutocompleteComponent,
    FormioPrimengCalendarComponent,
    FormioPrimengCheckboxComponent,
    FormioPrimengChipsComponent,
    FormioPrimengControlArrayComponent,
    FormioPrimengDropdownComponent,
    FormioPrimengEditorComponent,
    FormioPrimengFieldsetComponent,
    FormioPrimengInputComponent,
    FormioPrimengInputSwitchComponent,
    FormioPrimengMultiSelectComponent,
    FormioPrimengRatingComponent,
    FormioPrimengSliderComponent,
    FormioPrimengTextareaComponent,
    FormioPrimengInputControlComponent,
    FormioPrimengControlComponent,
    FormioPrimengFormComponent
  ],
  exports: [
    FormioFormsCoreModule,
    FormioPrimengFormControlComponent,
    FormioPrimengRadioGroupComponent,
    FormioPrimengAutocompleteComponent,
    FormioPrimengCalendarComponent,
    FormioPrimengCheckboxComponent,
    FormioPrimengChipsComponent,
    FormioPrimengControlArrayComponent,
    FormioPrimengDropdownComponent,
    FormioPrimengEditorComponent,
    FormioPrimengFieldsetComponent,
    FormioPrimengInputComponent,
    FormioPrimengInputSwitchComponent,
    FormioPrimengMultiSelectComponent,
    FormioPrimengRatingComponent,
    FormioPrimengSliderComponent,
    FormioPrimengTextareaComponent,
    FormioPrimengInputControlComponent,
    FormioPrimengControlComponent,
    FormioPrimengFormComponent
  ],
  entryComponents: [
    FormioPrimengRadioGroupComponent,
    FormioPrimengAutocompleteComponent,
    FormioPrimengCalendarComponent,
    FormioPrimengCheckboxComponent,
    FormioPrimengChipsComponent,
    FormioPrimengControlArrayComponent,
    FormioPrimengDropdownComponent,
    FormioPrimengEditorComponent,
    FormioPrimengFieldsetComponent,
    FormioPrimengInputComponent,
    FormioPrimengInputSwitchComponent,
    FormioPrimengMultiSelectComponent,
    FormioPrimengRatingComponent,
    FormioPrimengSliderComponent,
    FormioPrimengTextareaComponent,
    FormioPrimengInputControlComponent,
    FormioPrimengControlComponent,
    FormioPrimengFormComponent
  ]
})
export class FormioFormsPrimengUIModule {
}