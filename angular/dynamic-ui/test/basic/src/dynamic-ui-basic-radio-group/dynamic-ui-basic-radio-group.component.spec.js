"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dynamic_ui_basic_radio_group_component_1 = require("./dynamic-ui-basic-radio-group.component");
describe('DynamicUIRadioGroupBasicComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dynamic_ui_basic_radio_group_component_1.DynamicUIBasicRadioGroupComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dynamic_ui_basic_radio_group_component_1.DynamicUIBasicRadioGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

//# sourceMappingURL=dynamic-ui-basic-radio-group.component.spec.js.map
