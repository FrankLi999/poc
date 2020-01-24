import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angular2FontawesomeModule } from 'angular2-fontawesome'

import {DynamicUIBaseModule} from "@bpw-ui/base";
import {DynamicUIPrimengFormControlComponent} from "./dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
import {DynamicUIPrimengFormComponent} from "./dynamic-ui-primeng-form/dynamic-ui-primeng-form.component";
import {DynamicUIPrimengFormGroupComponent} from "./dynamic-ui-primeng-form-group/dynamic-ui-primeng-form-group.component";
import {DynamicUIPrimengRadioGroupComponent} from './dynamic-ui-primeng-radio-group/dynamic-ui-primeng-radio-group.component';
import {DynamicUIPrimengAutocompleteComponent} from './dynamic-ui-primeng-autocomplete/dynamic-ui-primeng.autocomplete.component';
import {DynamicUIPrimengCalendarComponent} from './dynamic-ui-primeng-calendar/dynamic-ui-primeng-calendar.component';
import {DynamicUIPrimengCheckboxComponent} from './dynamic-ui-primeng-checkbox/dynamic-ui-primeng-checkbox.component';
import {DynamicUIPrimengChipsComponent} from './dynamic-ui-primeng-chips/dynamic-ui-primeng-chips.component';
import {DynamicUIPrimengControlArrayComponent} from './dynamic-ui-primeng-control-array/dynamic-ui-primeng-control-array.component';
import {DynamicUIPrimengDropdownComponent} from './dynamic-ui-primeng-dropdown/dynamic-ui-primeng-dropdown.component';
import {DynamicUIPrimengEditorComponent} from './dynamic-ui-primeng-editor/dynamic-ui-primeng-editor.component';
import {DynamicUIPrimengFieldsetComponent} from './dynamic-ui-primeng-fieldset/dynamic-ui-primeng-fieldset.component';
import {DynamicUIPrimengInputComponent} from './dynamic-ui-primeng-input/dynamic-ui-primeng-input.component';
import {DynamicUIPrimengInputSwitchComponent} from './dynamic-ui-primeng-input-switch/dynamic-ui-primeng-input-switch.component';
import {DynamicUIPrimengMultiSelectComponent} from './dynamic-ui-primeng-multi-select/dynamic-ui-primeng-multi-select.component';
import {DynamicUIPrimengRatingComponent} from './dynamic-ui-primeng-rating/dynamic-ui-primeng-rating.component';
import {DynamicUIPrimengSliderComponent} from './dynamic-ui-primeng-slider/dynamic-ui-primeng-slider.component';
import {DynamicUIPrimengTextareaComponent} from './dynamic-ui-primeng-textarea/dynamic-ui-primeng-textarea.component';
import {DynamicUIPrimengControlComponent} from './dynamic-ui-primeng-control/dynamic-ui-primeng-control.component';
import {DynamicUIPrimengColumnsComponent} from './dynamic-ui-primeng-columns/dynamic-ui-primeng-columns.component';
import {DynamicUIPrimengDatagridComponent} from './dynamic-ui-primeng-datagrid/dynamic-ui-primeng-datagrid.component';
import {DynamicUIPrimengDynamicComponent} from './dynamic-ui-primeng-dynamic/dynamic-ui-primeng-dynamic.component';
import {DynamicUIPrimengCompositeComponent} from './dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component';
import {DynamicUIPrimengInputControlComponent} from './dynamic-ui-primeng-input-control/dynamic-ui-primeng-input-control.component';
@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Angular2FontawesomeModule,
    DynamicUIBaseModule,
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
    DynamicUIPrimengFormControlComponent,
    DynamicUIPrimengRadioGroupComponent,
    DynamicUIPrimengAutocompleteComponent,
    DynamicUIPrimengCalendarComponent,
    DynamicUIPrimengCheckboxComponent,
    DynamicUIPrimengChipsComponent,
    DynamicUIPrimengControlArrayComponent,
    DynamicUIPrimengDropdownComponent,
    DynamicUIPrimengEditorComponent,
    DynamicUIPrimengFieldsetComponent,
    DynamicUIPrimengInputComponent,
    DynamicUIPrimengInputSwitchComponent,
    DynamicUIPrimengMultiSelectComponent,
    DynamicUIPrimengRatingComponent,
    DynamicUIPrimengSliderComponent,
    DynamicUIPrimengTextareaComponent,
    DynamicUIPrimengControlComponent,
    DynamicUIPrimengFormComponent,
    DynamicUIPrimengFormGroupComponent,
    DynamicUIPrimengColumnsComponent,
    DynamicUIPrimengDatagridComponent,
    DynamicUIPrimengDynamicComponent,
    DynamicUIPrimengCompositeComponent,
    DynamicUIPrimengInputControlComponent
  ],
  exports: [
    DynamicUIPrimengFormControlComponent,
    DynamicUIPrimengRadioGroupComponent,
    DynamicUIPrimengAutocompleteComponent,
    DynamicUIPrimengCalendarComponent,
    DynamicUIPrimengCheckboxComponent,
    DynamicUIPrimengChipsComponent,
    DynamicUIPrimengControlArrayComponent,
    DynamicUIPrimengDropdownComponent,
    DynamicUIPrimengEditorComponent,
    DynamicUIPrimengFieldsetComponent,
    DynamicUIPrimengInputComponent,
    DynamicUIPrimengInputSwitchComponent,
    DynamicUIPrimengMultiSelectComponent,
    DynamicUIPrimengRatingComponent,
    DynamicUIPrimengSliderComponent,
    DynamicUIPrimengTextareaComponent,
    DynamicUIPrimengControlComponent,
    DynamicUIPrimengFormComponent,
    DynamicUIPrimengFormGroupComponent,
    DynamicUIPrimengColumnsComponent,
    DynamicUIPrimengDatagridComponent,
    DynamicUIPrimengDynamicComponent,
    DynamicUIPrimengCompositeComponent,
    DynamicUIPrimengInputControlComponent
  ],
  entryComponents: [
    DynamicUIPrimengRadioGroupComponent,
    DynamicUIPrimengAutocompleteComponent,
    DynamicUIPrimengCalendarComponent,
    DynamicUIPrimengCheckboxComponent,
    DynamicUIPrimengChipsComponent,
    DynamicUIPrimengControlArrayComponent,
    DynamicUIPrimengDropdownComponent,
    DynamicUIPrimengEditorComponent,
    DynamicUIPrimengFieldsetComponent,
    DynamicUIPrimengInputComponent,
    DynamicUIPrimengInputSwitchComponent,
    DynamicUIPrimengMultiSelectComponent,
    DynamicUIPrimengRatingComponent,
    DynamicUIPrimengSliderComponent,
    DynamicUIPrimengTextareaComponent,
    DynamicUIPrimengControlComponent,
    DynamicUIPrimengFormComponent,
    DynamicUIPrimengFormGroupComponent,
    DynamicUIPrimengColumnsComponent,
    DynamicUIPrimengDatagridComponent,
    DynamicUIPrimengCompositeComponent,
    DynamicUIPrimengInputControlComponent
  ]
})
export class DynamicUIPrimengModule {
}
