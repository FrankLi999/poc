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
exports.COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_START = 'START';
exports.COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END = 'END';
var ComponentTemplateDirective = (function () {
    function ComponentTemplateDirective(templateRef) {
        this.templateRef = templateRef;
        this.align = exports.COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END;
        this.as = null;
    }
    return ComponentTemplateDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ComponentTemplateDirective.prototype, "align", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ComponentTemplateDirective.prototype, "as", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ComponentTemplateDirective.prototype, "modelId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ComponentTemplateDirective.prototype, "modelType", void 0);
ComponentTemplateDirective = __decorate([
    core_1.Directive({
        selector: 'ng-template[modelId],ng-template[modelType]'
    }),
    __metadata("design:paramtypes", [core_1.TemplateRef])
], ComponentTemplateDirective);
exports.ComponentTemplateDirective = ComponentTemplateDirective;

//# sourceMappingURL=component-template.directive.js.map
