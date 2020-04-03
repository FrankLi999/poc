import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";

import { wcmAnimations } from "bpw-common";
import { WcmOperation, WcmService } from "bpw-wcm-service";
import * as fromStore from "bpw-wcm-service";
import { WcmNavigatorComponent } from "../../components/wcm-navigator/wcm-navigator.component";

@Component({
  selector: "content-area-layout-tree",
  templateUrl: "./content-area-layout-tree.component.html",
  styleUrls: ["./content-area-layout-tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: wcmAnimations
})
export class ContentAreaLayoutTreeComponent extends WcmNavigatorComponent
  implements OnInit, OnDestroy {
  functionMap: { [key: string]: Function } = {};
  constructor(
    protected wcmService: WcmService,
    protected store: Store<fromStore.WcmAppState>,
    protected matDialog: MatDialog,
    private router: Router
  ) {
    super(wcmService, store, matDialog);
  }

  ngOnInit() {
    this.rootNode = "contentAreaLayout";
    this.rootNodeType = "bpw:contentAreaLayoutFolder";
    this.functionMap["Create.contentAreaLayout"] = this.createContentAreaLayout;
    this.functionMap["Edit.contentAreaLayout"] = this.editContentAreaLayout;
    this.functionMap["Purge.contentAreaLayout"] = this.removeContentAreaLayout;

    this.nodeFilter = {
      nodePath: "",
      nodeTypes: ["bpw:contentAreaLayout", "bpw:folder"]
    };

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

  createContentAreaLayout() {
    const node = this.activeNode;
    const library = node.wcmPath.split("/", 4)[2];
    this.router.navigate(["/wcm-authoring/content-area-layout/new"], {
      queryParams: {
        library: library,
        repository: node.repository,
        workspace: node.workspace,
        layoutName: "Page Layout Name",
        editing: false
      }
    });
  }

  removeContentAreaLayout() {
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
          console.log("remove content area layout call in error", response);
          console.log(response);
        },
        () => {
          console.log(
            "remove content area layout observable is now completed."
          );
        }
      );
  }

  editContentAreaLayout() {
    const node = this.activeNode;
    const library = node.wcmPath.split("/", 4)[3];
    this.router.navigate(["/wcm-authoring/content-area-layout/edit"], {
      queryParams: {
        library: library,
        repository: node.repository,
        workspace: node.workspace,
        layoutName: node.name,
        // wcmPath: node.wcmPath,
        editing: true
      }
    });
  }
}
