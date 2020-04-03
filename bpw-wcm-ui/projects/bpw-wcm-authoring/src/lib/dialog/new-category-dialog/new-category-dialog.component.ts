import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WcmService, Category } from "bpw-wcm-service";
import { BaseMewResourceDialog } from "../base-new-resource-dialog";

@Component({
  selector: "new-category-dialog",
  templateUrl: "./new-category-dialog.component.html",
  styleUrls: ["./new-category-dialog.component.scss"]
})
export class NewCategoryDialogComponent extends BaseMewResourceDialog
  implements OnInit {
  formData: any;

  constructor(
    public matDialogRef: MatDialogRef<NewCategoryDialogComponent>,
    private wcmService: WcmService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    super(data);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formData = {
      properties: this.data.properties
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  createCategory(formData: any) {
    console.log("createCategory.....>>>", this.data);
    console.log("createCategory........", formData.properties);
    this.wcmService
      .createCategory({
        repository: this.data.repositoryName,
        workspace: this.data.workspaceName,
        library: this.data.library,
        ...formData.properties
      })
      .subscribe((event: any) => {
        // this.newThemeForm.reset();
        this.matDialogRef.close();
      });
  }
}
