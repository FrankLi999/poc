import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    FormioNg2DynamicFormService,
    FormioCheckboxModel,
    FormioFormControlModel,
    FormioFormArrayModel
} from "../formio/formio-core";
import { MATERIAL_EXAMPLE_MODEL } from "./material-example.model";

@Component({

    moduleId: module.id,
    selector: "formio-material-form",
    styleUrls: ["../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css"],
    templateUrl: "./material-formio.component.html",
    encapsulation: ViewEncapsulation.None
})

export class MaterialFormioComponent implements OnInit {

    formModel: FormioFormControlModel[] = MATERIAL_EXAMPLE_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: FormioCheckboxModel;

    arrayControl: FormArray;
    arrayModel: FormioFormArrayModel;

    constructor(private formService: FormioNg2DynamicFormService) {}

    ngOnInit() {

        this.formGroup = this.formService.createFormGroup(this.formModel);

        this.checkboxControl = this.formGroup.controls["exampleCheckbox"] as FormControl;
        this.checkboxModel = this.formService.findById("exampleCheckbox", this.formModel) as FormioCheckboxModel;

        this.arrayControl = this.formGroup.controls["materialFormArray"] as FormArray;
        this.arrayModel = this.formService.findById("materialFormArray", this.formModel) as FormioFormArrayModel;
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    remove(index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, this.arrayModel);
    }

    onChange($event) {
        console.log(`CHANGE event on: `, $event);
    }
}