import { TemplateRef } from "@angular/core";
export declare const COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_START = "START";
export declare const COMPONENT_TEMPLATE_DIRECTIVE_ALIGN_END = "END";
export declare class ComponentTemplateDirective {
    templateRef: TemplateRef<any>;
    align: string;
    as: string | null;
    modelId: string;
    modelType: string;
    constructor(templateRef: TemplateRef<any>);
}
