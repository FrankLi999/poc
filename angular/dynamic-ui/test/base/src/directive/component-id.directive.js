"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ComponentIdDirective = (function () {
    function ComponentIdDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    ComponentIdDirective.prototype.ngAfterViewInit = function () {
        if (this.componentId) {
            this.renderer.setAttribute(this.elementRef.nativeElement, 'id', this.componentId);
        }
    };
    return ComponentIdDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ComponentIdDirective.prototype, "componentId", void 0);
ComponentIdDirective = __decorate([
    core_1.Directive({
        selector: '[componentId]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
], ComponentIdDirective);
exports.ComponentIdDirective = ComponentIdDirective;

//# sourceMappingURL=component-id.directive.js.map
