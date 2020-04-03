import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WcmService, Library } from "bpw-wcm-service";
import { BaseMewResourceDialog } from "../base-new-resource-dialog";
@Component({
  selector: "bpw-wcm-authoring-new-library-dialog",
  templateUrl: "./new-library-dialog.component.html",
  styleUrls: ["./new-library-dialog.component.scss"]
})
export class NewLibraryDialogComponent extends BaseMewResourceDialog
  implements OnInit {
  constructor(
    public matDialogRef: MatDialogRef<NewLibraryDialogComponent>,
    private wcmService: WcmService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    super(data);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  createLibrary(formData: any) {
    this.wcmService
      .createLibrary({
        repository: this.data.repositoryName,
        workspace: this.data.workspaceName,
        ...formData.properties,
        ...formData.elements
      })
      .subscribe((event: any) => {
        // this.newThemeForm.reset();
        this.matDialogRef.close();
      });
  }
}
