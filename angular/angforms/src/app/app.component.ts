import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  ngForm = new FormGroup({
    id: new FormControl("id", Validators.required),
    names: new FormArray([
      new FormControl("1", Validators.required),
      new FormControl("2", Validators.required),
    ]),
  });

  title = "angforms";
  constructor() {}
  ngOnInit() {
    this.id.statusChanges.subscribe((status) =>
      console.log("status change", status, this.id)
    );
    this.id.statusChanges.subscribe((status) =>
      console.log("id status change", status, this.id)
    );

    this.getName(0).statusChanges.subscribe((status) =>
      console.log(" name 0 status change", status, this.getName(0))
    );
    this.getName(1).statusChanges.subscribe((status) =>
      console.log(" name 1 status change", status, this.getName(1))
    );
    this.names.statusChanges.subscribe((status) =>
      console.log("name status change", status, this.names)
    );

    this.id.valueChanges.subscribe((value) =>
      console.log(">>>>>>>>>> id.valueChanges", this.id, value)
    );

    this.names.valueChanges.subscribe((value) =>
      console.log(">>>>>>>>>> names.valueChanges", this.names, value)
    );
    this.getName(0).valueChanges.subscribe((value) =>
      console.log(">>>>>>>>>> names.valueChanges", this.getName(0), value)
    );
    this.getName(1).valueChanges.subscribe((value) =>
      console.log(">>>>>>>>>> names.valueChanges", this.getName(1), value)
    );
  }

  get names(): FormArray {
    return this.ngForm.get("names") as FormArray;
  }

  getName(index: number): FormControl {
    return (this.ngForm.get("names") as FormArray).at(index) as FormControl;
  }

  get id(): FormControl {
    return this.ngForm.get("id") as FormControl;
  }

  submitForm(): void {
    for (let i = 0; i < this.names.length; i++) {
      console.log(this.names.at(i).value);
    }

    console.log(this.id.value);
    console.log(this.ngForm.value);
  }

  addNameField() {
    this.names.push(new FormControl("", Validators.required));
  }

  deleteNameField(index: number) {
    if (this.names.length !== 1) {
      this.names.removeAt(index);
    }
  }
}
