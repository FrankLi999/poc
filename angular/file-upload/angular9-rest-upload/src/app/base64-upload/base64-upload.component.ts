import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Component({
  selector: "base64-upload",
  templateUrl: "./base64-upload.component.html",
  styleUrls: ["./base64-upload.component.scss"],
})
export class Base64UploadComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  files = [];
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @ViewChild("fileInputs", { static: false }) fileInputs: ElementRef;

  SERVER_URL: string = "http://localhost:8080/upload/base64";
  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      avatar: null,
      avatars: null,
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];

      reader.onload = () => {
        console.log(">>>>>>>>>>> base 64 file:", file);
        console.log(">>>>>>>>>>> base 64 reader:", reader);
        console.log(">>>>>>>>>>> base 64 reader result:", reader.result);
        this.form.get("avatar").setValue({
          filename: file.name,
          filetype: file.type,
          value: (reader.result as string).split(",")[1],
        });
      };
      reader.readAsDataURL(file);
    }
  }

  clearFile() {
    this.form.get("avatar").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  onFilesChange(event) {
    // let values = this.form.get("avatars").value || [];
    let values = [];
    console.log(
      ">>>>>>>> binary onFilesChange,",
      event.target.files,
      this.fileInputs.nativeElement.files
    );
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let reader = new FileReader();

        reader.onload = () => {
          console.log(
            ">>>>>>>>>>> base 64 file " + i + ":",
            event.target.files[i]
          );
          console.log(">>>>>>>>>>> base 64 reader:", reader);
          console.log(">>>>>>>>>>> base 64 reader result:", reader.result);
          values.push({
            filename: event.target.files[i].name,
            filetype: event.target.files[i].type,
            value: (reader.result as string).split(",")[1],
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      console.log(">>>>>>>> avatars,", values);
      this.form.get("avatars").setValue(values);
    }
  }

  clearFiles() {
    this.form.get("avatars").setValue(null);
    this.fileInputs.nativeElement.value = "";
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    console.log(">>>>>>>> base64,", formModel);
    this._upload(formModel)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              console.log(
                ">>>>>>>>>>>>>>>>>progress:",
                Math.round((event.loaded * 100) / event.total)
              );
              break;
            case HttpEventType.Response:
              console.log(">>>>>>>> HttpEventType.Response,", event);
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // file.inProgress = false;
          //return of(`${file.data.name} upload failed.`);
          return of(`upload failed.`);
        })
      )
      .subscribe((event: any) => {
        console.log("upload result,", event);
        this.loading = false;
        if (typeof event === "object") {
          console.log(event.body);
        }
      });
  }
  private _upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
