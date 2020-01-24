"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dynamic_ui_primeng_control_array_component_1 = require("./dynamic-ui-primeng-control-array.component");
describe('DynamicUIPrimengControlArrayComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dynamic_ui_primeng_control_array_component_1.DynamicUIPrimengControlArrayComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dynamic_ui_primeng_control_array_component_1.DynamicUIPrimengControlArrayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

//# sourceMappingURL=dynamic-ui-primeng-control-array.component.spec.js.map
