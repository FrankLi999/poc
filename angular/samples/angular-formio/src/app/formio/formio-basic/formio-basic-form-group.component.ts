import { Component, ContentChildren, OnInit, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    FormioFormGroupComponent,
    FormioFormControlEvent,
    FormioFormControlModel,
    FormioTemplateDirective,
    ComponentModel
} from "../formio-core";
import { FormioBasicFormControlComponent } from "./formio-basic-form-control.component";

@Component({
    selector: "formio-basic-form-group",
    templateUrl: "./formio-basic-form-group.component.html"
})
export class FormioBasicFormGroupComponent extends FormioFormGroupComponent implements  OnInit {

    @Input() group: FormGroup;
    @Input() model: FormioFormControlModel | ComponentModel;
    @Input() nestedTemplates: QueryList<FormioTemplateDirective>;
    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;
  
    @ViewChildren(FormioBasicFormControlComponent) components: QueryList<FormioBasicFormControlComponent>;

    ngOnInit() {
        // console.log(this.group);
        // console.log(this.model);
    }
}
