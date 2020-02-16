import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatOptionModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class AppMaterialModule {}
