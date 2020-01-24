import { Directive, Input, TemplateRef } from "@angular/core";

export const FORMIO_TEMPLATE_DIRECTIVE_ALIGN_START = "START";
export const FORMIO_TEMPLATE_DIRECTIVE_ALIGN_END = "END";

@Directive({
    selector: "ng-template[modelId],ng-template[modelType]"
})
export class FormioTemplateDirective {

    @Input() align: string = FORMIO_TEMPLATE_DIRECTIVE_ALIGN_END;
    @Input() as: string | null = null;
    @Input() modelId: string;
    @Input() modelType: string;

    constructor(public templateRef: TemplateRef<any>) {}
}