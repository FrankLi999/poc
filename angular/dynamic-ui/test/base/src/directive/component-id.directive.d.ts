import { ElementRef, Renderer2, AfterViewInit } from "@angular/core";
export declare class ComponentIdDirective implements AfterViewInit {
    private elementRef;
    private renderer;
    componentId: string | boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
}
