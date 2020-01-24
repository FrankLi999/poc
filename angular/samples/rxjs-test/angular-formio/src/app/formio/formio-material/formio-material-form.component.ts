import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    FormioFormComponent,
    FormioFormControlEvent,
    FormioFormControlModel,
    FormioTemplateDirective
} from "../formio-core";
import { FormioMaterialFormControlComponent } from "./formio-material-form-control.component";

@Component({
    selector: "formio-material-form",
    templateUrl: "./formio-material-form.component.html"
})
export class FormioMaterialFormComponent extends FormioFormComponent {

    @Input() group: FormGroup;
    @Input() model: FormioFormControlModel[];

    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) templates: QueryList<FormioTemplateDirective>;

    @ViewChildren(FormioMaterialFormControlComponent) components: QueryList<FormioMaterialFormControlComponent>;
}