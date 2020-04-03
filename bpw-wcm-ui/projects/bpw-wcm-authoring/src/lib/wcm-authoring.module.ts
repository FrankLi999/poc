import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";

import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";

import { TranslateModule } from "@ngx-translate/core";
import { AceEditorModule } from "ng2-ace-editor";
import { WcmDialogModule } from "./dialog/wcm-dialog.module";
import {
  SharedUIModule,
  ProgressBarModule,
  SidebarModule,
  ThemeOptionsModule,
  LayoutModule,
  AuthGuard,
  AuthStoreModule
} from "bpw-common";
import { JsonSchemaFormModule } from "@bpw/ajsf-core";
import { MaterialDesignFrameworkModule } from "@bpw/ajsf-material";
import { ResolveGuard, WcmAppStoreModule } from "bpw-wcm-service";
import { ComponentModule } from "./components/component.module";
import { JcrExplorerModule } from "./jcr-explorer/jcr-explorer.module";
import { ResourceLibraryModule } from "./resource-library/resource-library.module";
import { SiteExplorerModule } from "./site-explorer/site-explorer.module";
import { ContentAreaLayoutModule } from "./content-area-layout/content-area-layout.module";
import { ResourceTypeModule } from "./resource-type/resource-type.module";
import { RenderTemplateModule } from "./render-template/render-template.module";
import { QueryBuilderModule } from "./query-builder/query-builder.module";
import { CategoryModule } from "./category/category.module";
import { SiteConfigModule } from "./site-config/site-config.module";
import { WorkflowModule } from "./workflow/workflow.module";
import { ValidationRuleModule } from "./validation-rule/validation-rule.module";
import { PreviewModule } from "bpw-wcm-preview";

import { WcmAuthoringComponent } from "./entry/wcm-authoring/wcm-authoring.component";
import { JcrExplorerComponent } from "./jcr-explorer/jcr-explorer/jcr-explorer.component";
import { CategoryTreeComponent } from "./category/category-tree/category-tree.component";
import { CategoryComponent } from "./category/category/category.component";
import { ContentAreaLayoutTreeComponent } from "./content-area-layout/content-area-layout-tree/content-area-layout-tree.component";
import { ContentAreaLayoutsComponent } from "./content-area-layout/content-area-layouts/content-area-layouts.component";
import { ContentAreaDesignerComponent } from "./content-area-layout/content-area-designer/content-area-designer.component";
import { ContentAreaPreviewComponent } from "bpw-wcm-preview";
import { QueryTreeComponent } from "./query-builder/query-tree/query-tree.component";
import { QueryStatementComponent } from "./query-builder/query-statement/query-statement.component";
import { QueryListComponent } from "./query-builder/query-list/query-list.component";
import { RenderTemplateTreeComponent } from "./render-template/render-template-tree/render-template-tree.component";
import { RenderTemplateComponent } from "./render-template/render-template/render-template.component";
import { RenderTemplatesComponent } from "./render-template/render-templates/render-templates.component";
import { ResourceLibraryTreeComponent } from "./resource-library/resource-library-tree/resource-library-tree.component";
import { LibraryComponent } from "./resource-library/library/library.component";
import { LibrariesComponent } from "./resource-library/libraries/libraries.component";
import { ResourceTypeTreeComponent } from "./resource-type/resource-type-tree/resource-type-tree.component";
import { ResourceTypeListComponent } from "./resource-type/resource-type-list/resource-type-list.component";
import { ResourceTypeEditorComponent } from "./resource-type/resource-type-editor/resource-type-editor.component";
import { SiteTreeComponent } from "./site-explorer/site-tree/site-tree.component";
import { SiteAreaComponent } from "./site-explorer/site-area/site-area.component";
import { ContentItemComponent } from "./site-explorer/content-item/content-item.component";
import { SiteExplorerComponent } from "./site-explorer/site-explorer/site-explorer.component";
import { SiteConfigComponent } from "./site-config/site-config/site-config.component";
import { SiteConfigsComponent } from "./site-config/site-configs/site-configs.component";
import { SiteConfigTreeComponent } from "./site-config/site-config-tree/site-config-tree.component";
import { ValidationRuleTreeComponent } from "./validation-rule/validation-rule-tree/validation-rule-tree.component";
import { ValidationRulesComponent } from "./validation-rule/validation-rules/validation-rules.component";
import { ValidationRuleComponent } from "./validation-rule/validation-rule/validation-rule.component";
import { WorkflowTreeComponent } from "./workflow/workflow-tree/workflow-tree.component";
import { WorkflowsComponent } from "./workflow/workflows/workflows.component";
import { WorkflowComponent } from "./workflow/workflow/workflow.component";

const routes: Routes = [
  {
    path: "",
    component: WcmAuthoringComponent,
    canActivate: [AuthGuard, ResolveGuard],
    children: [
      {
        path: "jcr-explorer",
        component: JcrExplorerComponent
      },
      {
        path: "category",
        component: CategoryTreeComponent,
        children: [
          {
            path: "item",
            component: CategoryComponent
          }
        ]
      },
      {
        path: "content-area-layout",
        component: ContentAreaLayoutTreeComponent,
        children: [
          {
            path: "edit",
            component: ContentAreaDesignerComponent
          },
          {
            path: "new",
            component: ContentAreaDesignerComponent
          },
          {
            path: "list",
            component: ContentAreaLayoutsComponent
          }
        ]
      },
      {
        path: "preview",
        component: ContentAreaPreviewComponent
      },
      {
        path: "query-builder",
        component: QueryTreeComponent,
        children: [
          {
            path: "edit",
            component: QueryStatementComponent
          },
          {
            path: "new",
            component: QueryStatementComponent
          },
          {
            path: "list",
            component: QueryListComponent
          }
        ]
      },
      {
        path: "render-template",
        component: RenderTemplateTreeComponent,
        children: [
          {
            path: "edit",
            component: RenderTemplateComponent
          },
          {
            path: "new",
            component: RenderTemplateComponent
          },
          {
            path: "list",
            component: RenderTemplatesComponent
          }
        ]
      },
      {
        path: "resource-library",
        component: ResourceLibraryTreeComponent,
        children: [
          {
            path: "edit",
            component: LibraryComponent
          },
          {
            path: "list",
            component: LibrariesComponent
          }
        ]
      },
      {
        path: "resource-type",
        component: ResourceTypeTreeComponent,
        children: [
          {
            path: "edit",
            component: ResourceTypeEditorComponent
          },
          {
            path: "new",
            component: ResourceTypeEditorComponent
          },
          {
            path: "list",
            component: ResourceTypeListComponent
          }
        ]
      },
      {
        path: "site-config",
        component: SiteConfigTreeComponent,
        children: [
          {
            path: "list",
            component: SiteConfigsComponent
          },
          {
            path: "new-siteconfig",
            component: SiteConfigComponent
          },
          {
            path: "edit-siteconfig",
            component: SiteConfigComponent
          }
        ]
      },
      {
        path: "site-explorer",
        component: SiteTreeComponent,
        children: [
          {
            path: "navigator",
            component: SiteExplorerComponent
          },
          {
            path: "new-content",
            component: ContentItemComponent
          },
          {
            path: "edit-content",
            component: ContentItemComponent
          },
          {
            path: "new-sa",
            component: SiteAreaComponent
          },
          {
            path: "edit-sa",
            component: SiteAreaComponent
          }
        ]
      },
      {
        path: "validation-rule",
        component: ValidationRuleTreeComponent,
        children: [
          {
            path: "edit",
            component: ValidationRuleComponent
          },
          {
            path: "new",
            component: ValidationRuleComponent
          },
          {
            path: "list",
            component: ValidationRulesComponent
          }
        ]
      },
      {
        path: "workflow",
        component: WorkflowTreeComponent,
        children: [
          {
            path: "edit",
            component: WorkflowComponent
          },
          {
            path: "new",
            component: WorkflowComponent
          },
          {
            path: "list",
            component: WorkflowsComponent
          }
        ]
      }
    ]
  }
];
@NgModule({
  declarations: [WcmAuthoringComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    WcmDialogModule,
    JsonSchemaFormModule,
    MaterialDesignFrameworkModule,
    TranslateModule,

    SharedUIModule,
    SidebarModule,
    AceEditorModule,

    ProgressBarModule,
    ThemeOptionsModule,

    LayoutModule,

    AuthStoreModule,
    WcmAppStoreModule,
    ComponentModule,
    JcrExplorerModule,
    ResourceLibraryModule,
    SiteExplorerModule,
    ContentAreaLayoutModule,
    ResourceTypeModule,
    RenderTemplateModule,
    QueryBuilderModule,
    CategoryModule,
    WorkflowModule,
    SiteConfigModule,
    ValidationRuleModule,
    PreviewModule
  ],
  providers: [ResolveGuard],
  exports: [WcmAuthoringComponent]
})
export class WcmAuthoringModule {}
