import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ContentChildren,
  ViewChildren
} from '@angular/core';
import { FormGroup } from "@angular/forms";

import {
  FormioFormGroupComponent,
  FormioFormControlEvent,
  FormioFormControlModel,
  FormioTemplateDirective,
  ComponentModel
} from "../../formio-core";
import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
import {
  FormioBaseComponent
} from "../../formio-core";

@Component({
  selector: 'formio-basic-columns',
  templateUrl: './formio-basic-columns.component.html'
})
export class FormioBasicColumnsComponent extends FormioBaseComponent  {
  @Input() group: FormGroup;
  @Input() model: FormioFormControlModel | ComponentModel;
  @Input() nestedTemplates: QueryList<FormioTemplateDirective>;
  @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;
  @ViewChildren(FormioBasicFormControlComponent) components: QueryList<FormioBasicFormControlComponent>;
  type = "columns";
  
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
