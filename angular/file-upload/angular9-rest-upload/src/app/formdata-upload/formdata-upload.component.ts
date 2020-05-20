import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
} from "@angular/common/http";

@Component({
  selector: "formdata-upload",
  templateUrl: "./formdata-upload.component.html",
  styleUrls: ["./formdata-upload.component.scss"],
})
export class FormdataUploadComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @ViewChild("fileInputs", { static: false }) fileInputs: ElementRef;

  SERVER_URL: string = "http://localhost:8080/upload/multipart";
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
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get("avatar").setValue(file);
    }
  }

  clearFile() {
    this.form.get("avatar").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  onFilesChange(event) {
    if (event.target.files.length > 0) {
      console.log(">>>>>>>>>>>> formdata multiple files,", event.target.files);
      let files = [];
      for (let i = 0; i < event.target.files.length; i++) {
        files.push(event.target.files[i]);
      }
      this.form.get("avatars").setValue(files);
    }
  }

  clearFiles() {
    this.form.get("avatars").setValue(null);
    this.fileInputs.nativeElement.value = "";
  }

  onSubmit() {
    const formModel = this._prepareSave();
    this.loading = true;
    console.log(">>>>>>>> binary,", formModel);
    this._upload(formModel).subscribe((result) => {
      console.log("upload result,", result);
      this.loading = false;
    });
  }

  private _upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  private _prepareSave(): any {
    let input = new FormData();
    input.append("name", this.form.get("name").value);
    input.append("avatar", this.form.get("avatar").value);
    let files = this.form.get("avatars").value;
    for (let i = 0; i < files.length; i++) {
      input.append("avatars", files[i]);
    }
    console.log(
      ">>>>>>>>>> submit formdata avatar",
      this.form.get("avatars").value
    );
    console.log(
      ">>>>>>>>>> submit formdata avatars",
      this.form.get("avatars").value
    );
    console.log(">>>>>>>>>> submit formdata", input);
    return input;
  }
}
