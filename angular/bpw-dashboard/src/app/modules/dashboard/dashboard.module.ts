import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";

import { SharedComponentsModule } from "../../shared/shared.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    SharedComponentsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
