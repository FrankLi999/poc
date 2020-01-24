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
    BaseFormControlComponent,
    BaseFormControlEvent,
    ComponentModel,
    ComponentTemplateDirective,
    DynamicUIFormService,
    DynamicUIFormValidationService
  } from "@bpw-ui/base";
  import { DynamicUIBasicFormControlComponent } from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
  import { DynamicUIBasicCompositeComponent } from '../dynamic-ui-basic-composite/dynamic-ui-basic-composite.component';

  @Component({
    selector: 'dynamic-ui-basic-datagrid',
    templateUrl: './dynamic-ui-basic-datagrid.component.html'
  })
  export class DynamicUIBasicDatagridComponent extends DynamicUIBasicCompositeComponent implements OnInit {
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
