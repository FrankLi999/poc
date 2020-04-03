import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";

import { wcmAnimations } from "bpw-common";
import { WcmOperation, JsonForm, WcmService } from "bpw-wcm-service";
import * as fromStore from "bpw-wcm-service";
import { WcmNavigatorComponent } from "../../components/wcm-navigator/wcm-navigator.component";
import { NewLibraryDialogComponent } from "../../dialog/new-library-dialog/new-library-dialog.component";

@Component({
  selector: "resource-library-tree",
  templateUrl: "./resource-library-tree.component.html",
  styleUrls: ["./resource-library-tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: wcmAnimations
})
export class ResourceLibraryTreeComponent extends WcmNavigatorComponent
  implements OnInit, OnDestroy {
  functionMap: { [key: string]: Function } = {};
  jsonFormMap: { [key: string]: JsonForm } = {}; //TODO: it is loaded asynchronously during ngInit
  constructor(
    protected wcmService: WcmService,
    protected store: Store<fromStore.WcmAppState>,
    protected matDialog: MatDialog
  ) {
    super(wcmService, store, matDialog);
  }

  ngOnInit() {
    this.rootNode = "";
    this.rootNodeType = "bpw:library";
    this.functionMap["Create.library"] = this.createLibrary;
    this.functionMap["Purge.library"] = this.removeItem;
    this.nodeFilter = {
      nodePath: "",
      nodeTypes: ["bpw:library"]
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

  createLibrary() {
    console.log("create library--", this.jsonFormMap);
    const node = this.activeNode;
    console.log(node, node.repository, node.workspace, node.wcmPath);
    let dialogRef = this.matDialog.open(NewLibraryDialogComponent, {
      panelClass: "library-new-dialog",
      data: {
        jsonFormObject: this.jsonFormMap[
          "/bpwizard/library/system/authoringTemplate/libraryType"
        ].formSchema,
        repositoryName: node.repository,
        workspaceName: node.workspace
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      this.load(node);
    });
  }

  removeItem() {
    console.log("delete library:");
    const node = this.activeNode;
    console.log(node, node.repository, node.workspace);

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
