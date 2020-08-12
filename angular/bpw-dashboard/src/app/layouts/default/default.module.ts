import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DefaultComponent } from "./default.component";
import { SharedComponentsModule } from "../../shared/shared.module";
import { PostsModule } from "../../modules/posts/posts.module";
import { DashboardModule } from "../../modules/dashboard/dashboard.module";
@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    PostsModule,
    SharedComponentsModule,
    MatSidenavModule
  ]
})
export class DefaultModule {}
