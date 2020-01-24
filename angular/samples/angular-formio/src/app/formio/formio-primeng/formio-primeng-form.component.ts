import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    FormioFormComponent,
    FormioFormControlEvent,
    FormioFormControlModel,
    FormioTemplateDirective
} from '../formio-core';
import { FormioPrimengFormControlComponent } from "./formio-primeng-form-control.component";

@Component({
    selector: "formio-primeng-form",
    templateUrl: "./formio-primeng-form.component.html"
})
export class FormioPrimengFormComponent extends FormioFormComponent {

    @Input() group: FormGroup;
    @Input() model: FormioFormControlModel[];

    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) templates: QueryList<FormioTemplateDirective>;

    @ViewChildren(FormioPrimengFormControlComponent) components: QueryList<FormioPrimengFormControlComponent>;
}