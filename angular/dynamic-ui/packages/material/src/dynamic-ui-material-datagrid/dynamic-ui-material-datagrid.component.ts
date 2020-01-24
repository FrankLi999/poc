import {
    Component,
    Input,
    Output,
    EventEmitter,
    QueryList,
    ContentChildren,
    ViewChildren,
    ChangeDetectorRef,
    OnInit
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
  import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
  import { DynamicUIMaterialCompositeComponent } from '../dynamic-ui-material-composite/dynamic-ui-material-composite.component';

  @Component({
    selector: 'dynamic-ui-material-datagrid',
    templateUrl: './dynamic-ui-material-datagrid.component.html'
  })
  export class DynamicUIMaterialDatagridComponent extends DynamicUIMaterialCompositeComponent implements OnInit {
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
