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
var angular2_text_mask_1 = require("angular2-text-mask");
var flex_layout_1 = require("@angular/flex-layout");
var angular2_fontawesome_1 = require("angular2-fontawesome");
var base_1 = require("@bpw-ui/base");
var dynamic_ui_basic_form_control_component_1 = require("./dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component");
var dynamic_ui_basic_form_component_1 = require("./dynamic-ui-basic-form/dynamic-ui-basic-form.component");
var dynamic_ui_basic_form_group_component_1 = require("./dynamic-ui-basic-form-group/dynamic-ui-basic-form-group.component");
var dynamic_ui_basic_columns_component_1 = require("./dynamic-ui-basic-columns/dynamic-ui-basic-columns.component");
var dynamic_ui_basic_datagrid_component_1 = require("./dynamic-ui-basic-datagrid/dynamic-ui-basic-datagrid.component");
var dynamic_ui_basic_control_array_component_1 = require("./dynamic-ui-basic-control-array/dynamic-ui-basic-control-array.component");
var dynamic_ui_basic_checkbox_component_1 = require("./dynamic-ui-basic-checkbox/dynamic-ui-basic-checkbox.component");
var dynamic_ui_basic_control_component_1 = require("./dynamic-ui-basic-control/dynamic-ui-basic-control.component");
var dynamic_ui_basic_fieldset_component_1 = require("./dynamic-ui-basic-fieldset/dynamic-ui-basic-fieldset.component");
var dynamic_ui_basic_input_component_1 = require("./dynamic-ui-basic-input/dynamic-ui-basic-input.component");
var dynamic_ui_basic_radio_group_component_1 = require("./dynamic-ui-basic-radio-group/dynamic-ui-basic-radio-group.component");
var dynamic_ui_basic_select_component_1 = require("./dynamic-ui-basic-select/dynamic-ui-basic-select.component");
var dynamic_ui_basic_textarea_component_1 = require("./dynamic-ui-basic-textarea/dynamic-ui-basic-textarea.component");
var dynamic_ui_basic_dynamic_component_1 = require("./dynamic-ui-basic-dynamic/dynamic-ui-basic-dynamic.component");
var dynamic_ui_basic_composite_component_1 = require("././dynamic-ui-basic-composite/dynamic-ui-basic-composite.component");
var DynamicUIBasicModule = (function () {
    function DynamicUIBasicModule() {
    }
    return DynamicUIBasicModule;
}());
DynamicUIBasicModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            angular2_text_mask_1.TextMaskModule,
            base_1.DynamicUIBaseModule,
            flex_layout_1.FlexLayoutModule,
            angular2_fontawesome_1.Angular2FontawesomeModule
        ],
        declarations: [
            dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent,
            dynamic_ui_basic_control_array_component_1.DynamicUIBasicControlArrayComponent,
            dynamic_ui_basic_checkbox_component_1.DynamicUIBasicCheckboxComponent,
            dynamic_ui_basic_control_component_1.DynamicUIBasicControlComponent,
            dynamic_ui_basic_fieldset_component_1.DynamicUIBasicFieldsetComponent,
            dynamic_ui_basic_input_component_1.DynamicUIBasicInputComponent,
            dynamic_ui_basic_radio_group_component_1.DynamicUIBasicRadioGroupComponent,
            dynamic_ui_basic_select_component_1.DynamicUIBasicSelectComponent,
            dynamic_ui_basic_textarea_component_1.DynamicUIBasicTextareaComponent,
            dynamic_ui_basic_form_component_1.DynamicUIBasicFormComponent,
            dynamic_ui_basic_form_group_component_1.DynamicUIBasicFormGroupComponent,
            dynamic_ui_basic_columns_component_1.DynamicUIBasicColumnsComponent,
            dynamic_ui_basic_datagrid_component_1.DynamicUIBasicDatagridComponent,
            dynamic_ui_basic_dynamic_component_1.DynamicUIBasicDynamicComponent,
            dynamic_ui_basic_composite_component_1.DynamicUIBasicCompositeComponent
        ],
        exports: [
            dynamic_ui_basic_form_control_component_1.DynamicUIBasicFormControlComponent,
            dynamic_ui_basic_control_array_component_1.DynamicUIBasicControlArrayComponent,
            dynamic_ui_basic_checkbox_component_1.DynamicUIBasicCheckboxComponent,
            dynamic_ui_basic_control_component_1.DynamicUIBasicControlComponent,
            dynamic_ui_basic_fieldset_component_1.DynamicUIBasicFieldsetComponent,
            dynamic_ui_basic_input_component_1.DynamicUIBasicInputComponent,
            dynamic_ui_basic_radio_group_component_1.DynamicUIBasicRadioGroupComponent,
            dynamic_ui_basic_select_component_1.DynamicUIBasicSelectComponent,
            dynamic_ui_basic_textarea_component_1.DynamicUIBasicTextareaComponent,
            dynamic_ui_basic_form_component_1.DynamicUIBasicFormComponent,
            dynamic_ui_basic_form_group_component_1.DynamicUIBasicFormGroupComponent,
            dynamic_ui_basic_columns_component_1.DynamicUIBasicColumnsComponent,
            dynamic_ui_basic_datagrid_component_1.DynamicUIBasicDatagridComponent,
            dynamic_ui_basic_dynamic_component_1.DynamicUIBasicDynamicComponent,
            dynamic_ui_basic_composite_component_1.DynamicUIBasicCompositeComponent
        ],
        entryComponents: [
            dynamic_ui_basic_control_array_component_1.DynamicUIBasicControlArrayComponent,
            dynamic_ui_basic_checkbox_component_1.DynamicUIBasicCheckboxComponent,
            dynamic_ui_basic_fieldset_component_1.DynamicUIBasicFieldsetComponent,
            dynamic_ui_basic_input_component_1.DynamicUIBasicInputComponent,
            dynamic_ui_basic_radio_group_component_1.DynamicUIBasicRadioGroupComponent,
            dynamic_ui_basic_select_component_1.DynamicUIBasicSelectComponent,
            dynamic_ui_basic_textarea_component_1.DynamicUIBasicTextareaComponent,
            dynamic_ui_basic_form_component_1.DynamicUIBasicFormComponent,
            dynamic_ui_basic_form_group_component_1.DynamicUIBasicFormGroupComponent,
            dynamic_ui_basic_columns_component_1.DynamicUIBasicColumnsComponent,
            dynamic_ui_basic_datagrid_component_1.DynamicUIBasicDatagridComponent,
            dynamic_ui_basic_composite_component_1.DynamicUIBasicCompositeComponent
        ]
    })
], DynamicUIBasicModule);
exports.DynamicUIBasicModule = DynamicUIBasicModule;

//# sourceMappingURL=dynamic-ui-basic.module.js.map
