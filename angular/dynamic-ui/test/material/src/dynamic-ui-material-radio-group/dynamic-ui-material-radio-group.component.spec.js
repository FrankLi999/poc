"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dynamic_ui_material_radio_group_component_1 = require("./dynamic-ui-material-radio-group.component");
describe('DynamicUIMaterialRadioGroupComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dynamic_ui_material_radio_group_component_1.DynamicUIMaterialRadioGroupComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dynamic_ui_material_radio_group_component_1.DynamicUIMaterialRadioGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

//# sourceMappingURL=dynamic-ui-material-radio-group.component.spec.js.map
