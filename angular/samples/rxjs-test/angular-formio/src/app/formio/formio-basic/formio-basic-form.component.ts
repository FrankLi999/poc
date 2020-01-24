import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    FormioFormComponent,
    FormioFormControlEvent,
    FormioFormControlModel,
    FormioTemplateDirective,
    ComponentModel
} from "../formio-core";
import { FormioBasicFormControlComponent } from "./formio-basic-form-control.component";

@Component({
    selector: "formio-basic-form",
    templateUrl: "./formio-basic-form.component.html"
})
export class FormioBasicFormComponent extends FormioFormComponent {

    @Input() group: FormGroup;
    @Input() model: FormioFormControlModel[] | Array<ComponentModel>;

    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) nestedTemplates: QueryList<FormioTemplateDirective>;
  
    @ViewChildren(FormioBasicFormControlComponent) components: QueryList<FormioBasicFormControlComponent>;
}
