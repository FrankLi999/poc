import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from "@angular/core";

@Directive({
    selector: '[componentId]'
})
export class ComponentIdDirective implements AfterViewInit {

    @Input() componentId: string | boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {

        if (this.componentId) {
            this.renderer.setAttribute(
              this.elementRef.nativeElement,
              'id',
              this.componentId as string);
        }
    }
}
