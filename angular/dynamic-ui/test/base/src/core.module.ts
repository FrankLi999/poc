import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicUIFormService } from './service/dynamic-ui-form-service';
import { DynamicUIFormValidationService } from './service/dynamic-ui-form-validation.service';
import { ComponentIdDirective } from "./directive/component-id.directive";
import { ComponentTemplateDirective } from "./directive/component-template.directive";

@NgModule({

    imports: [CommonModule, ReactiveFormsModule],
    declarations: [
      ComponentIdDirective,
      ComponentTemplateDirective
    ],
    exports: [
      ComponentIdDirective,
      ComponentTemplateDirective
    ]
})

export class DynamicUIBaseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicUIBaseModule,
            providers: [
                DynamicUIFormService,
                DynamicUIFormValidationService
            ]
        };
    }
}
