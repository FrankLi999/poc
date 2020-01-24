import { NgModule } from "@angular/core";
import { Http, BaseRequestOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";

import { customValidator } from "./app.validators";
import { DynamicUIBaseModule } from "@bpw-ui/base";
import { DynamicUIPrimengModule } from "@bpw-ui/primeng";
import { DynamicUIMaterialModule } from "@bpw-ui/material";
import { DynamicUIBasicModule } from "@bpw-ui/basic";
import { PrimengDemoComponent } from "./primeng/primeng-demo.component";
import { BasicDemoComponent } from "./basic/basic-demo.component";
import { MaterialDemoComponent } from "./material/material-demo.component";

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

export function mockBackendFactory(mockBackend: MockBackend, baseRequestOptions: BaseRequestOptions) {
    return new Http(mockBackend, baseRequestOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    PrimengDemoComponent,
    BasicDemoComponent,
    MaterialDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DynamicUIBaseModule.forRoot(),
    DynamicUIPrimengModule,
    DynamicUIMaterialModule,
    DynamicUIBasicModule
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
