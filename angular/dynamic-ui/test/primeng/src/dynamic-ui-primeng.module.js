"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var primeng_1 = require("primeng/primeng");
var flex_layout_1 = require("@angular/flex-layout");
var angular2_fontawesome_1 = require("angular2-fontawesome");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_primeng_form_control_component_1 = require("./dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component");
var dynamic_ui_primeng_form_component_1 = require("./dynamic-ui-primeng-form/dynamic-ui-primeng-form.component");
var dynamic_ui_primeng_form_group_component_1 = require("./dynamic-ui-primeng-form-group/dynamic-ui-primeng-form-group.component");
var dynamic_ui_primeng_radio_group_component_1 = require("./dynamic-ui-primeng-radio-group/dynamic-ui-primeng-radio-group.component");
var dynamic_ui_primeng_autocomplete_component_1 = require("./dynamic-ui-primeng-autocomplete/dynamic-ui-primeng.autocomplete.component");
var dynamic_ui_primeng_calendar_component_1 = require("./dynamic-ui-primeng-calendar/dynamic-ui-primeng-calendar.component");
var dynamic_ui_primeng_checkbox_component_1 = require("./dynamic-ui-primeng-checkbox/dynamic-ui-primeng-checkbox.component");
var dynamic_ui_primeng_chips_component_1 = require("./dynamic-ui-primeng-chips/dynamic-ui-primeng-chips.component");
var dynamic_ui_primeng_control_array_component_1 = require("./dynamic-ui-primeng-control-array/dynamic-ui-primeng-control-array.component");
var dynamic_ui_primeng_dropdown_component_1 = require("./dynamic-ui-primeng-dropdown/dynamic-ui-primeng-dropdown.component");
var dynamic_ui_primeng_editor_component_1 = require("./dynamic-ui-primeng-editor/dynamic-ui-primeng-editor.component");
var dynamic_ui_primeng_fieldset_component_1 = require("./dynamic-ui-primeng-fieldset/dynamic-ui-primeng-fieldset.component");
var dynamic_ui_primeng_input_component_1 = require("./dynamic-ui-primeng-input/dynamic-ui-primeng-input.component");
var dynamic_ui_primeng_input_switch_component_1 = require("./dynamic-ui-primeng-input-switch/dynamic-ui-primeng-input-switch.component");
var dynamic_ui_primeng_multi_select_component_1 = require("./dynamic-ui-primeng-multi-select/dynamic-ui-primeng-multi-select.component");
var dynamic_ui_primeng_rating_component_1 = require("./dynamic-ui-primeng-rating/dynamic-ui-primeng-rating.component");
var dynamic_ui_primeng_slider_component_1 = require("./dynamic-ui-primeng-slider/dynamic-ui-primeng-slider.component");
var dynamic_ui_primeng_textarea_component_1 = require("./dynamic-ui-primeng-textarea/dynamic-ui-primeng-textarea.component");
var dynamic_ui_primeng_control_component_1 = require("./dynamic-ui-primeng-control/dynamic-ui-primeng-control.component");
var dynamic_ui_primeng_columns_component_1 = require("./dynamic-ui-primeng-columns/dynamic-ui-primeng-columns.component");
var dynamic_ui_primeng_datagrid_component_1 = require("./dynamic-ui-primeng-datagrid/dynamic-ui-primeng-datagrid.component");
var dynamic_ui_primeng_dynamic_component_1 = require("./dynamic-ui-primeng-dynamic/dynamic-ui-primeng-dynamic.component");
var dynamic_ui_primeng_composite_component_1 = require("./dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component");
var dynamic_ui_primeng_input_control_component_1 = require("./dynamic-ui-primeng-input-control/dynamic-ui-primeng-input-control.component");
var DynamicUIPrimengModule = (function () {
    function DynamicUIPrimengModule() {
    }
    return DynamicUIPrimengModule;
}());
DynamicUIPrimengModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            flex_layout_1.FlexLayoutModule,
            angular2_fontawesome_1.Angular2FontawesomeModule,
            base_1.DynamicUIBaseModule,
            primeng_1.AutoCompleteModule,
            primeng_1.CalendarModule,
            primeng_1.CheckboxModule,
            primeng_1.ChipsModule,
            primeng_1.DropdownModule,
            primeng_1.EditorModule,
            primeng_1.InputSwitchModule,
            primeng_1.InputTextModule,
            primeng_1.InputTextareaModule,
            primeng_1.MultiSelectModule,
            primeng_1.RadioButtonModule,
            primeng_1.RatingModule,
            primeng_1.SliderModule,
            primeng_1.SpinnerModule
        ],
        declarations: [
            dynamic_ui_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent,
            dynamic_ui_primeng_radio_group_component_1.DynamicUIPrimengRadioGroupComponent,
            dynamic_ui_primeng_autocomplete_component_1.DynamicUIPrimengAutocompleteComponent,
            dynamic_ui_primeng_calendar_component_1.DynamicUIPrimengCalendarComponent,
            dynamic_ui_primeng_checkbox_component_1.DynamicUIPrimengCheckboxComponent,
            dynamic_ui_primeng_chips_component_1.DynamicUIPrimengChipsComponent,
            dynamic_ui_primeng_control_array_component_1.DynamicUIPrimengControlArrayComponent,
            dynamic_ui_primeng_dropdown_component_1.DynamicUIPrimengDropdownComponent,
            dynamic_ui_primeng_editor_component_1.DynamicUIPrimengEditorComponent,
            dynamic_ui_primeng_fieldset_component_1.DynamicUIPrimengFieldsetComponent,
            dynamic_ui_primeng_input_component_1.DynamicUIPrimengInputComponent,
            dynamic_ui_primeng_input_switch_component_1.DynamicUIPrimengInputSwitchComponent,
            dynamic_ui_primeng_multi_select_component_1.DynamicUIPrimengMultiSelectComponent,
            dynamic_ui_primeng_rating_component_1.DynamicUIPrimengRatingComponent,
            dynamic_ui_primeng_slider_component_1.DynamicUIPrimengSliderComponent,
            dynamic_ui_primeng_textarea_component_1.DynamicUIPrimengTextareaComponent,
            dynamic_ui_primeng_control_component_1.DynamicUIPrimengControlComponent,
            dynamic_ui_primeng_form_component_1.DynamicUIPrimengFormComponent,
            dynamic_ui_primeng_form_group_component_1.DynamicUIPrimengFormGroupComponent,
            dynamic_ui_primeng_columns_component_1.DynamicUIPrimengColumnsComponent,
            dynamic_ui_primeng_datagrid_component_1.DynamicUIPrimengDatagridComponent,
            dynamic_ui_primeng_dynamic_component_1.DynamicUIPrimengDynamicComponent,
            dynamic_ui_primeng_composite_component_1.DynamicUIPrimengCompositeComponent,
            dynamic_ui_primeng_input_control_component_1.DynamicUIPrimengInputControlComponent
        ],
        exports: [
            dynamic_ui_primeng_form_control_component_1.DynamicUIPrimengFormControlComponent,
            dynamic_ui_primeng_radio_group_component_1.DynamicUIPrimengRadioGroupComponent,
            dynamic_ui_primeng_autocomplete_component_1.DynamicUIPrimengAutocompleteComponent,
            dynamic_ui_primeng_calendar_component_1.DynamicUIPrimengCalendarComponent,
            dynamic_ui_primeng_checkbox_component_1.DynamicUIPrimengCheckboxComponent,
            dynamic_ui_primeng_chips_component_1.DynamicUIPrimengChipsComponent,
            dynamic_ui_primeng_control_array_component_1.DynamicUIPrimengControlArrayComponent,
            dynamic_ui_primeng_dropdown_component_1.DynamicUIPrimengDropdownComponent,
            dynamic_ui_primeng_editor_component_1.DynamicUIPrimengEditorComponent,
            dynamic_ui_primeng_fieldset_component_1.DynamicUIPrimengFieldsetComponent,
            dynamic_ui_primeng_input_component_1.DynamicUIPrimengInputComponent,
            dynamic_ui_primeng_input_switch_component_1.DynamicUIPrimengInputSwitchComponent,
            dynamic_ui_primeng_multi_select_component_1.DynamicUIPrimengMultiSelectComponent,
            dynamic_ui_primeng_rating_component_1.DynamicUIPrimengRatingComponent,
            dynamic_ui_primeng_slider_component_1.DynamicUIPrimengSliderComponent,
            dynamic_ui_primeng_textarea_component_1.DynamicUIPrimengTextareaComponent,
            dynamic_ui_primeng_control_component_1.DynamicUIPrimengControlComponent,
            dynamic_ui_primeng_form_component_1.DynamicUIPrimengFormComponent,
            dynamic_ui_primeng_form_group_component_1.DynamicUIPrimengFormGroupComponent,
            dynamic_ui_primeng_columns_component_1.DynamicUIPrimengColumnsComponent,
            dynamic_ui_primeng_datagrid_component_1.DynamicUIPrimengDatagridComponent,
            dynamic_ui_primeng_dynamic_component_1.DynamicUIPrimengDynamicComponent,
            dynamic_ui_primeng_composite_component_1.DynamicUIPrimengCompositeComponent,
            dynamic_ui_primeng_input_control_component_1.DynamicUIPrimengInputControlComponent
        ],
        entryComponents: [
            dynamic_ui_primeng_radio_group_component_1.DynamicUIPrimengRadioGroupComponent,
            dynamic_ui_primeng_autocomplete_component_1.DynamicUIPrimengAutocompleteComponent,
            dynamic_ui_primeng_calendar_component_1.DynamicUIPrimengCalendarComponent,
            dynamic_ui_primeng_checkbox_component_1.DynamicUIPrimengCheckboxComponent,
            dynamic_ui_primeng_chips_component_1.DynamicUIPrimengChipsComponent,
            dynamic_ui_primeng_control_array_component_1.DynamicUIPrimengControlArrayComponent,
            dynamic_ui_primeng_dropdown_component_1.DynamicUIPrimengDropdownComponent,
            dynamic_ui_primeng_editor_component_1.DynamicUIPrimengEditorComponent,
            dynamic_ui_primeng_fieldset_component_1.DynamicUIPrimengFieldsetComponent,
            dynamic_ui_primeng_input_component_1.DynamicUIPrimengInputComponent,
            dynamic_ui_primeng_input_switch_component_1.DynamicUIPrimengInputSwitchComponent,
            dynamic_ui_primeng_multi_select_component_1.DynamicUIPrimengMultiSelectComponent,
            dynamic_ui_primeng_rating_component_1.DynamicUIPrimengRatingComponent,
            dynamic_ui_primeng_slider_component_1.DynamicUIPrimengSliderComponent,
            dynamic_ui_primeng_textarea_component_1.DynamicUIPrimengTextareaComponent,
            dynamic_ui_primeng_control_component_1.DynamicUIPrimengControlComponent,
            dynamic_ui_primeng_form_component_1.DynamicUIPrimengFormComponent,
            dynamic_ui_primeng_form_group_component_1.DynamicUIPrimengFormGroupComponent,
            dynamic_ui_primeng_columns_component_1.DynamicUIPrimengColumnsComponent,
            dynamic_ui_primeng_datagrid_component_1.DynamicUIPrimengDatagridComponent,
            dynamic_ui_primeng_composite_component_1.DynamicUIPrimengCompositeComponent,
            dynamic_ui_primeng_input_control_component_1.DynamicUIPrimengInputControlComponent
        ]
    })
], DynamicUIPrimengModule);
exports.DynamicUIPrimengModule = DynamicUIPrimengModule;

//# sourceMappingURL=dynamic-ui-primeng.module.js.map
