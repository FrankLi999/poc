import { NgModule } from "@angular/core";
import { Http, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import {MatButtonModule, MatCheckboxModule} from '@angular/material'
// import { NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

// import { DynamicFormsCoreModule } from "./dynamic-page/core";
// import { DynamicFormsBasicUIModule } from "./dynamic-page/ui-basic";
// import { DynamicFormsMaterialUIModule } from "./dynamic-page/ui-material";
// import { DynamicFormsPrimeNGUIModule } from "./dynamic-page/ui-primeng";

import { FormioFormsCoreModule } from "./formio/formio-core";
import { FormioFormsBasicUIModule } from "./formio/formio-basic";
import { FormioFormsMaterialUIModule } from "./formio/formio-material";
import { FormioFormsPrimengUIModule } from "./formio/formio-primeng";


// import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
// import { DynamicFormsBasicUIModule } from "@ng2-dynamic-forms/ui-basic";
// import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";
// import { DynamicFormsFoundationUIModule } from "@ng2-dynamic-forms/ui-foundation";
// import { DynamicFormsKendoUIModule } from "@ng2-dynamic-forms/ui-kendo";
// import { DynamicFormsMaterialUIModule } from "@ng2-dynamic-forms/ui-material";
// import { DynamicFormsNGBootstrapUIModule } from "@ng2-dynamic-forms/ui-ng-bootstrap";
// import { DynamicFormsPrimeNGUIModule } from "@ng2-dynamic-forms/ui-primeng";

// import { BasicExampleComponent } from "./basic/basic-example.component";
// import { BasicDynamicComponent } from "./basic/basic-dynamic.component";
import { BasicFormioComponent } from "./basic/basic-formio.component";
// import { BootstrapExampleComponent } from "./bootstrap/bootstrap-example.component";
// import { FoundationExampleComponent } from "./foundation/foundation-example.component";
// import { KendoExampleComponent } from "./kendo/kendo-example.component";
// import { MaterialExampleComponent } from "./material/material-example.component";
// import { MaterialDynamicComponent } from "./material/material-dynamic.component";
import { MaterialFormioComponent } from "./material/material-formio.component";
// import { MaterialLayoutComponent } from "./material/material-layout.component";
// import { NGBootstrapExampleComponent } from "./ng-bootstrap/ng-bootstrap-example.component";
// import { PrimeNGExampleComponent } from "./primeng/primeng-example.component";
// import { PrimeNGDynamicComponent } from "./primeng/primeng-dynamic.component";
import { PrimengFormioComponent } from "./primeng/primeng-formio.component";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { AppRoutingModule } from './app.routing.module';
import { customValidator } from "./app.validators";
import { AppComponent } from './app.component';

export function mockBackendFactory(mockBackend: MockBackend, baseRequestOptions: BaseRequestOptions) {
    return new Http(mockBackend, baseRequestOptions);
}
  
@NgModule({
  declarations: [
    AppComponent,
    //BasicExampleComponent,
    //BasicDynamicComponent,
    BasicFormioComponent,
    MaterialFormioComponent,
    PrimengFormioComponent,
    // BootstrapExampleComponent,
    // FoundationExampleComponent,
    // KendoExampleComponent,
    //MaterialExampleComponent,
    //MaterialDynamicComponent,
    //MaterialLayoutComponent,
    // NGBootstrapExampleComponent,
    //PrimeNGExampleComponent,
    //PrimeNGDynamicComponent,
    ValidationMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatNativeDateModule,
    //NgbDatepickerModule.forRoot(),
    //NgbTimepickerModule.forRoot(),

    FormioFormsCoreModule.forRoot(),
    FormioFormsBasicUIModule,
    FormioFormsMaterialUIModule,
    FormioFormsPrimengUIModule,
    // DynamicFormsBootstrapUIModule,
    // DynamicFormsFoundationUIModule,
    // DynamicFormsKendoUIModule,
    //DynamicFormsMaterialUIModule,
    // DynamicFormsNGBootstrapUIModule,
    //DynamicFormsPrimeNGUIModule,
    MatButtonModule, 
    MatCheckboxModule
  ],
  providers: [
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: mockBackendFactory
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: NG_VALIDATORS,
            useValue: customValidator,
            multi: true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
