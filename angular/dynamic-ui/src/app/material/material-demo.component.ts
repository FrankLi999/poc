import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicUIFormService,
    FormModel,
    ComponentModel
} from "@bpw-ui/base";
import { EXAMPLE_FORM_MODEL } from "./material-example-form.model";

@Component({
    selector: "dynamic-ui-material-form-demo",
    styleUrls: ["../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css"],
    templateUrl: "./material-demo.component.html",
    encapsulation: ViewEncapsulation.None
})

export class MaterialDemoComponent implements OnInit {

    formModel: FormModel = EXAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicUIFormService) {}

    ngOnInit() {
      this.formGroup = this.formService.createForm(this.formModel);
    }

    onChange($event) {
        console.log(`CHANGE event on: `, $event);
    }
}
