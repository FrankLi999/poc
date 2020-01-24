import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from "@angular/core";

@Directive({
    selector: "[formioId]"
})
export class FormioIdDirective implements AfterViewInit {

    @Input() formioId: string | boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {

        if (this.formioId) {
            this.renderer.setAttribute(this.elementRef.nativeElement, "id", this.formioId as string);
        }
    }
}