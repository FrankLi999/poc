import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicUIFormService,
    ComponentModel,
    FormModel
} from "@bpw-ui/base";

import {
  EXAMPLE_FORM_MODEL
} from './example-form.model';
@Component({
    selector: "dynamic-ui-basic-form-demo",
    templateUrl: "./basic-demo.component.html"
})

export class BasicDemoComponent implements OnInit {

    formGroup3: FormGroup;
    formModel3: FormModel;
    constructor(
        private formService: DynamicUIFormService) {
      this.formModel3 = EXAMPLE_FORM_MODEL;
    }

    ngOnInit() {
        this.formGroup3 = this.formService.createForm(EXAMPLE_FORM_MODEL);
    }

    onBlur($event) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}
