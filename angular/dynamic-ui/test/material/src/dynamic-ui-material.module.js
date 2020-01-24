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
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var angular2_fontawesome_1 = require("angular2-fontawesome");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_material_form_control_component_1 = require("./dynamic-ui-material-form-control/dynamic-ui-material-form-control.component");
var dynamic_ui_material_form_component_1 = require("./dynamic-ui-material-form/dynamic-ui-material-form.component");
var dynamic_ui_material_form_group_component_1 = require("./dynamic-ui-material-form-group/dynamic-ui-material-form-group.component");
var dynamic_ui_material_control_array_component_1 = require("./dynamic-ui-material-control-array/dynamic-ui-material-control-array.component");
var dynamic_ui_material_checkbox_component_1 = require("./dynamic-ui-material-checkbox/dynamic-ui-material-checkbox.component");
var dynamic_ui_material_date_picker_component_1 = require("./dynamic-ui-material-date-picker/dynamic-ui-material-date-picker.component");
var dynamic_ui_material_fieldset_component_1 = require("./dynamic-ui-material-fieldset/dynamic-ui-material-fieldset.component");
var dynamic_ui_material_input_component_1 = require("./dynamic-ui-material-input/dynamic-ui-material-input.component");
var dynamic_ui_material_radio_group_component_1 = require("./dynamic-ui-material-radio-group/dynamic-ui-material-radio-group.component");
var dynamic_ui_material_select_component_1 = require("./dynamic-ui-material-select/dynamic-ui-material-select.component");
var dynamic_ui_material_slider_component_1 = require("./dynamic-ui-material-slider/dynamic-ui-material-slider.component");
var dynamic_ui_material_control_component_1 = require("./dynamic-ui-material-control/dynamic-ui-material-control.component");
var dynamic_ui_material_textarea_component_1 = require("./dynamic-ui-material-textarea/dynamic-ui-material-textarea.component");
var dynamic_ui_material_slide_toggle_component_1 = require("./dynamic-ui-material-slide-toggle/dynamic-ui-material-slide-toggle.component");
var dynamic_ui_material_columns_component_1 = require("./dynamic-ui-material-columns/dynamic-ui-material-columns.component");
var dynamic_ui_material_datagrid_component_1 = require("./dynamic-ui-material-datagrid/dynamic-ui-material-datagrid.component");
var dynamic_ui_material_dynamic_component_1 = require("./dynamic-ui-material-dynamic/dynamic-ui-material-dynamic.component");
var dynamic_ui_material_composite_component_1 = require("./dynamic-ui-material-composite/dynamic-ui-material-composite.component");
var DynamicUIMaterialModule = (function () {
    function DynamicUIMaterialModule() {
    }
    return DynamicUIMaterialModule;
}());
DynamicUIMaterialModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            flex_layout_1.FlexLayoutModule,
            angular2_fontawesome_1.Angular2FontawesomeModule,
            material_1.MatAutocompleteModule,
            material_1.MatCheckboxModule,
            material_1.MatDatepickerModule,
            material_1.MatInputModule,
            material_1.MatRadioModule,
            material_1.MatSelectModule,
            material_1.MatSliderModule,
            material_1.MatSlideToggleModule,
            base_1.DynamicUIBaseModule
        ],
        declarations: [
            dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent,
            dynamic_ui_material_control_array_component_1.DynamicUIMaterialControlArrayComponent,
            dynamic_ui_material_checkbox_component_1.DynamicUIMaterialCheckboxComponent,
            dynamic_ui_material_date_picker_component_1.DynamicUIMaterialDatePickerComponent,
            dynamic_ui_material_fieldset_component_1.DynamicUIMaterialFieldsetComponent,
            dynamic_ui_material_input_component_1.DynamicUIMaterialInputComponent,
            dynamic_ui_material_radio_group_component_1.DynamicUIMaterialRadioGroupComponent,
            dynamic_ui_material_select_component_1.DynamicUIMaterialSelectComponent,
            dynamic_ui_material_slider_component_1.DynamicUIMaterialSliderComponent,
            dynamic_ui_material_textarea_component_1.DynamicUIMaterialTextareaComponent,
            dynamic_ui_material_control_component_1.DynamicUIMaterialControlComponent,
            dynamic_ui_material_slide_toggle_component_1.DynamicUIMaterialSlideToggleComponent,
            dynamic_ui_material_form_component_1.DynamicUIMaterialFormComponent,
            dynamic_ui_material_form_group_component_1.DynamicUIMaterialFormGroupComponent,
            dynamic_ui_material_columns_component_1.DynamicUIMaterialColumnsComponent,
            dynamic_ui_material_datagrid_component_1.DynamicUIMaterialDatagridComponent,
            dynamic_ui_material_dynamic_component_1.DynamicUIMaterialDynamicComponent,
            dynamic_ui_material_composite_component_1.DynamicUIMaterialCompositeComponent
        ],
        exports: [
            dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent,
            dynamic_ui_material_control_array_component_1.DynamicUIMaterialControlArrayComponent,
            dynamic_ui_material_checkbox_component_1.DynamicUIMaterialCheckboxComponent,
            dynamic_ui_material_date_picker_component_1.DynamicUIMaterialDatePickerComponent,
            dynamic_ui_material_fieldset_component_1.DynamicUIMaterialFieldsetComponent,
            dynamic_ui_material_input_component_1.DynamicUIMaterialInputComponent,
            dynamic_ui_material_radio_group_component_1.DynamicUIMaterialRadioGroupComponent,
            dynamic_ui_material_select_component_1.DynamicUIMaterialSelectComponent,
            dynamic_ui_material_slider_component_1.DynamicUIMaterialSliderComponent,
            dynamic_ui_material_slide_toggle_component_1.DynamicUIMaterialSlideToggleComponent,
            dynamic_ui_material_textarea_component_1.DynamicUIMaterialTextareaComponent,
            dynamic_ui_material_control_component_1.DynamicUIMaterialControlComponent,
            dynamic_ui_material_form_component_1.DynamicUIMaterialFormComponent,
            dynamic_ui_material_form_group_component_1.DynamicUIMaterialFormGroupComponent,
            dynamic_ui_material_columns_component_1.DynamicUIMaterialColumnsComponent,
            dynamic_ui_material_datagrid_component_1.DynamicUIMaterialDatagridComponent,
            dynamic_ui_material_dynamic_component_1.DynamicUIMaterialDynamicComponent,
            dynamic_ui_material_composite_component_1.DynamicUIMaterialCompositeComponent
        ],
        entryComponents: [
            dynamic_ui_material_form_control_component_1.DynamicUIMaterialFormControlComponent,
            dynamic_ui_material_control_array_component_1.DynamicUIMaterialControlArrayComponent,
            dynamic_ui_material_checkbox_component_1.DynamicUIMaterialCheckboxComponent,
            dynamic_ui_material_date_picker_component_1.DynamicUIMaterialDatePickerComponent,
            dynamic_ui_material_fieldset_component_1.DynamicUIMaterialFieldsetComponent,
            dynamic_ui_material_input_component_1.DynamicUIMaterialInputComponent,
            dynamic_ui_material_radio_group_component_1.DynamicUIMaterialRadioGroupComponent,
            dynamic_ui_material_select_component_1.DynamicUIMaterialSelectComponent,
            dynamic_ui_material_slider_component_1.DynamicUIMaterialSliderComponent,
            dynamic_ui_material_slide_toggle_component_1.DynamicUIMaterialSlideToggleComponent,
            dynamic_ui_material_textarea_component_1.DynamicUIMaterialTextareaComponent,
            dynamic_ui_material_control_component_1.DynamicUIMaterialControlComponent,
            dynamic_ui_material_form_component_1.DynamicUIMaterialFormComponent,
            dynamic_ui_material_form_group_component_1.DynamicUIMaterialFormGroupComponent,
            dynamic_ui_material_columns_component_1.DynamicUIMaterialColumnsComponent,
            dynamic_ui_material_datagrid_component_1.DynamicUIMaterialDatagridComponent,
            dynamic_ui_material_composite_component_1.DynamicUIMaterialCompositeComponent
        ]
    })
], DynamicUIMaterialModule);
exports.DynamicUIMaterialModule = DynamicUIMaterialModule;

//# sourceMappingURL=dynamic-ui-material.module.js.map
