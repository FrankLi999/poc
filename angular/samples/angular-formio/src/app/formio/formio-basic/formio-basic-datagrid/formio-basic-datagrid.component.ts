import {
    Component,
    Input,
    Output,
    EventEmitter,
    QueryList,
    ContentChildren,
    ViewChildren
  } from '@angular/core';
  import { FormGroup, FormArray } from "@angular/forms";
  
  import {
    FormioFormGroupComponent,
    FormioFormControlEvent,
    FormioFormControlModel,
    FormioTemplateDirective,
    ComponentModel,
    FormioFormService
  } from "../../formio-core";
  import { FormioBasicFormControlComponent } from "../formio-basic-form-control.component";
  import {
    FormioBaseComponent
  } from "../../formio-core";
  
  @Component({
    selector: 'formio-basic-datagrid',
    templateUrl: './formio-basic-datagrid.component.html'
  })
  export class FormioBasicDatagridComponent extends FormioBaseComponent  {
    @Input() group: FormGroup;
    @Input() model: FormioFormControlModel | ComponentModel;
    @Input() nestedTemplates: QueryList<FormioTemplateDirective>;
    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;
    @ViewChildren(FormioBasicFormControlComponent) components: QueryList<FormioBasicFormControlComponent>;
    type = "columns";
    
    formArray: FormArray;
    constructor(private formService: FormioFormService) {
      super();
    }
  
    ngOnInit() {
      super.ngOnInit();
      this.formArray = this.group.controls[(this.model as ComponentModel).key] as FormArray;
    }

    removeColumn(idx: number) {
      this.formArray.removeAt(idx);
    }

    newRow() {
      this.formArray.push(this.formService.createGroup((this.model as ComponentModel).components));
    }
  }
  