import { 
  Component,
  OnInit,
  ViewEncapsulation,
  ContentChildren,
  QueryList
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { 
  FormioNg2DynamicFormService,
  FormioCheckboxModel,
  FormioFormControlModel,
  FormioTemplateDirective
} from "../formio/formio-core";
import { PRIMENG_EXAMPLE_MODEL } from "./primeng-example.model";

@Component({

    moduleId: module.id,
    selector: "formio-primeng-form",
    styleUrls: [
        "../../../node_modules/primeng/resources/themes/omega/theme.css",
        "../../../node_modules/primeng/resources/primeng.min.css",
        "../../../node_modules/quill/dist/quill.core.css",
        "../../../node_modules/quill/dist/quill.snow.css",
    ],
    templateUrl: "./primeng-formio.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PrimengFormioComponent implements OnInit {

    formModel: FormioFormControlModel[] = PRIMENG_EXAMPLE_MODEL;
    formGroup: FormGroup;

    checkboxControl: FormControl;
    checkboxModel: FormioCheckboxModel;
    constructor(private formService: FormioNg2DynamicFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
        this.checkboxControl = this.formGroup.controls["primeCheckboxGroup"]["controls"]["primeCheckboxGroup1"] as FormControl; // Type assertion for having updateValue method available
        this.checkboxModel = this.formService.findById("primeCheckboxGroup1", this.formModel) as FormioCheckboxModel;
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }
}