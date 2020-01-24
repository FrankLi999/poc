import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter,
    QueryList,
    ContentChildren,
    ViewChildren,
    ChangeDetectorRef
  } from '@angular/core';
  import { FormGroup, FormArray } from "@angular/forms";

  import {
    BaseFormGroupComponent,
    BaseFormControlEvent,
    ComponentModel,
    ComponentTemplateDirective,
    DynamicUIFormService,
    BaseComponent,
    DynamicUIFormValidationService
  } from "@bpw-ui/base";
  import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";
  import { DynamicUIPrimengCompositeComponent } from '../dynamic-ui-primeng-composite/dynamic-ui-primeng-composite.component';
  @Component({
    selector: 'dynamic-ui-primeng-datagrid',
    templateUrl: './dynamic-ui-primeng-datagrid.component.html'
  })
  export class DynamicUIPrimengDatagridComponent extends DynamicUIPrimengCompositeComponent implements OnInit {
    type = "datagrid";
    formArray: FormArray;

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected formService: DynamicUIFormService,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, formService, validationService);
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
