import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormioNg2DynamicFormService } from "./service/formio-ng2-dynamic-form.service";
import { FormioNg2DynamicFormModelService } from "./service/formio-ng2-dynamic-form-model.service";
import { FormioNg2DynamicFormValidationService } from "./service/formio-ng2-dynamic-form-validation.service";
import { FormioFormService } from './service/formio-form-service';
import { FormioFormValidationService } from './service/formio-form-validation.service';
import { FormioIdDirective } from "./directive/formio-id.directive";
import { FormioTemplateDirective } from "./directive/formio-template.directive";

@NgModule({

    imports: [CommonModule, ReactiveFormsModule],
    declarations: [
        FormioIdDirective, 
        FormioTemplateDirective
    ],
    exports: [
        FormioIdDirective, 
        FormioTemplateDirective
    ]
})

export class FormioFormsCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormioFormsCoreModule,
            providers: [
                FormioNg2DynamicFormService,
                FormioNg2DynamicFormValidationService,
                FormioNg2DynamicFormModelService,
                FormioFormService,
                FormioFormValidationService
            ]
        };
    }
}