import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { Base64UploadComponent } from "./base64-upload/base64-upload.component";
import { FormdataUploadComponent } from "./formdata-upload/formdata-upload.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BinaryUploadComponent } from './binary-upload/binary-upload.component';

@NgModule({
  declarations: [AppComponent, Base64UploadComponent, FormdataUploadComponent, BinaryUploadComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
