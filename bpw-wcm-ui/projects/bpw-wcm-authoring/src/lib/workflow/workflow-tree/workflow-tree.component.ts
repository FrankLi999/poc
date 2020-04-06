import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { wcmAnimations } from "bpw-common";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";

import { WcmOperation, JsonForm, WcmService, Category } from "bpw-wcm-service";
import * as fromStore from "bpw-wcm-service";
import { WcmNavigatorComponent } from "../../components/wcm-navigator/wcm-navigator.component";
import { NewCategoryDialogComponent } from "../../dialog/new-category-dialog/new-category-dialog.component";

@Component({
  selector: "workflow-tree",
  templateUrl: "./workflow-tree.component.html",
  styleUrls: ["./workflow-tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: wcmAnimations
})
export class WorkflowTreeComponent extends WcmNavigatorComponent
  implements OnInit, OnDestroy {
  functionMap: { [key: string]: Function } = {};
  jsonFormMap: { [key: string]: JsonForm } = {};
  constructor(
    protected wcmService: WcmService,
    protected store: Store<fromStore.WcmAppState>,
    protected matDialog: MatDialog,
    private router: Router
  ) {
    super(wcmService, store, matDialog);
  }

  ngOnInit() {
    this.rootNode = "workflow";
    this.rootNodeType = "bpw:workflowFolder";
    this.functionMap["Create.bpmnWorkflow"] = this.createWorkflow;
    this.functionMap["Edit.bpmnWorkflow"] = this.editWorkflow;
    this.functionMap["Purge.bpmnWorkflow"] = this.removeItem;
    this.nodeFilter = {
      nodePath: "",
      nodeTypes: ["bpw:bpmnWorkflow"]
    };
    this.store
      .pipe(takeUntil(this.unsubscribeAll), select(fromStore.getJsonForms))
      .subscribe(
        (jsonForms: { [key: string]: JsonForm }) => {
          if (jsonForms) {
            this.jsonFormMap = jsonForms;
          }
        },
        response => {
          console.log("getJsonForm call ended in error", response);
          console.log(response);
        },
        () => {
          console.log("getJsonForm observable is now completed.");
        }
      );
    this.store
      .pipe(takeUntil(this.unsubscribeAll), select(fromStore.getOperations))
      .subscribe(
        (operations: { [key: string]: WcmOperation[] }) => {
          if (operations) {
            this.operationMap = operations;
          }
        },
        response => {
          console.log("GET call in error", response);
          console.log(response);
        },
        () => {
          console.log("The GET observable is now completed.");
        }
      );
    super.ngOnInit();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.loadError && this.store.dispatch(new fromStore.WcmSystemClearError());
  }

  doNodeOperation(item: String, operation: WcmOperation) {
    this.functionMap[`${operation.operation}.${operation.resourceName}`].call(
      this
    );
  }
  editWorkflow() {
    const node = this.activeNode;
    const library = node.wcmPath.split("/", 4)[3];
    this.router.navigate(["/wcm-authoring/workflow/edit"], {
      queryParams: {
        library: library,
        repository: node.repository,
        workspace: node.workspace,
        wcmPath: node.wcmPath,
        editing: "true"
      }
    });
  }
  createWorkflow() {
    const node = this.activeNode;
    const library = node.wcmPath.split("/", 3)[2];
    this.router.navigate(["/wcm-authoring/workflow/new"], {
      queryParams: {
        library: library,
        repository: node.repository,
        workspace: node.workspace,
        wcmPath: node.wcmPath,
        editing: "false"
      }
    });
  }

  removeItem() {
    const node = this.activeNode;
    this.wcmService
      .purgeWcmItem(node.repository, node.workspace, node.wcmPath)
      .subscribe(
        (event: any) => {
          if (event.type === 4) {
            this.nodeRemoved(node);
          }
        },
        response => {
          console.log("removeLibrary call in error", response);
          console.log(response);
        },
        () => {
          console.log("removeLibrary observable is now completed.");
        }
      );
  }
}