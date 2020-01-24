import {
  Component,
  OnInit,
  ViewEncapsulation,
  ContentChildren,
  QueryList
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  DynamicUIFormService,
  ComponentModel,
  FormModel,
  ComponentTemplateDirective
} from "@bpw-ui/base";
import { EXAMPLE_FORM_MODEL } from "./primeng-example-form.model";

@Component({
    selector: "dynamic-ui-primeng-form-demo",
    styleUrls: [
        "../../../node_modules/primeng/resources/themes/omega/theme.css",
        "../../../node_modules/primeng/resources/primeng.min.css",
        "../../../node_modules/quill/dist/quill.core.css",
        "../../../node_modules/quill/dist/quill.snow.css",
    ],
    templateUrl: "./primeng-demo.component.html",
    encapsulation: ViewEncapsulation.None
})

export class PrimengDemoComponent implements OnInit {

    formModel: FormModel = EXAMPLE_FORM_MODEL;
    formGroup: FormGroup;

    constructor(private formService: DynamicUIFormService) {}

    ngOnInit() {
        this.formGroup = this.formService.createForm(this.formModel);
    }

    onChange($event) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }
}
