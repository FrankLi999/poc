import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTreeModule } from "@angular/material/tree";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { TranslateModule } from "@ngx-translate/core";
import { SharedUIModule, SidebarModule } from "bpw-common";

import { LibrariesComponent } from "./libraries/libraries.component";
import { LibraryComponent } from "./library/library.component";
import { ResourceLibraryTreeComponent } from "./resource-library-tree/resource-library-tree.component";

@NgModule({
  declarations: [
    LibrariesComponent,
    LibraryComponent,
    ResourceLibraryTreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CdkTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTreeModule,
    TranslateModule,
    SharedUIModule,
    SidebarModule
  ],
  exports: [LibrariesComponent, LibraryComponent, ResourceLibraryTreeComponent]
})
export class ResourceLibraryModule {}
