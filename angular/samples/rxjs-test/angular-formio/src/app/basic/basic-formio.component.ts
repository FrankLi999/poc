import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    FormioNg2DynamicFormService,
    FormioCheckboxModel,
    FormioFormControlModel,
    FormioFormArrayModel,
    FormioFormLoaderService, 
    FormioFormService, 
    ComponentModel
} from "../formio/formio-core";
import { 
    BASIC_EXAMPLE_MODEL, 
    BASIC_EXAMPLE_ARRAY_MODEL 
} from "./basic-example.model";
import {
    FORMIO_EXAMPLE_FORMIO_MODEL
} from './formio-example-form';
@Component({

    moduleId: module.id,
    selector: "formio-basic-form-demo",
    templateUrl: "./basic-formio.component.html"
})

export class BasicFormioComponent implements OnInit {

    formModel1: FormioFormControlModel[];
    formModel2: FormioFormControlModel[];

    formGroup1: FormGroup;
    formGroup2: FormGroup;

    formGroup3: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: FormioCheckboxModel;

    arrayControl: FormArray;
    arrayModel: FormioFormArrayModel;
    formModel3: Array<ComponentModel>;
    constructor(
        private formioService: FormioFormService,
        private ng2DynamicFormService: FormioNg2DynamicFormService) {

        //this.formModel1 = BASIC_EXAMPLE_MODEL;
        //this.formModel2 = BASIC_EXAMPLE_ARRAY_MODEL;

        this.formModel1 = this.ng2DynamicFormService.fromJSON(JSON.stringify(BASIC_EXAMPLE_MODEL));
        this.formModel2 = this.ng2DynamicFormService.fromJSON(JSON.stringify(BASIC_EXAMPLE_ARRAY_MODEL));

        this.formGroup1 = this.ng2DynamicFormService.createFormGroup(this.formModel1);
        this.formGroup2 = this.ng2DynamicFormService.createFormGroup(this.formModel2);
    }

    ngOnInit() {

        this.checkboxControl = this.formGroup1.controls["basicCheckbox"] as FormControl;
        this.checkboxModel = this.ng2DynamicFormService.findById("basicCheckbox", this.formModel1) as FormioCheckboxModel;

        this.arrayControl = this.formGroup2.controls["basicFormArray"] as FormArray;
        this.arrayModel = this.ng2DynamicFormService.findById("basicFormArray", this.formModel2) as FormioFormArrayModel;
        this.formModel3 = FORMIO_EXAMPLE_FORMIO_MODEL.components;
        /*
        let formioFormLoaderService = new FormioFormLoaderService('https://examples.form.io/example');
        formioFormLoaderService.loadForm().subscribe((form: FormModel) => {
            this.formModel = form;
            if (form && form.components) {
                this.formGroup3 = this.formioService.createForm(form);
            }
        });
        */
        this.formGroup3 = this.formioService.createForm(FORMIO_EXAMPLE_FORMIO_MODEL);
    }

    add() {
        this.ng2DynamicFormService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    remove(index: number) {
        this.ng2DynamicFormService.removeFormArrayGroup(index, this.arrayControl, this.arrayModel);
    }

    clear() {
        this.ng2DynamicFormService.clearFormArray(this.arrayControl, this.arrayModel);
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