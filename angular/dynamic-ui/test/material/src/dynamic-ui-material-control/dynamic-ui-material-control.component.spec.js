"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dynamic_ui_material_control_component_1 = require("./dynamic-ui-material-control.component");
describe('DynamicUIMaterialControlComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dynamic_ui_material_control_component_1.DynamicUIMaterialControlComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dynamic_ui_material_control_component_1.DynamicUIMaterialControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

//# sourceMappingURL=dynamic-ui-material-control.component.spec.js.map
