import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { wcmAnimations } from "bpw-common";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { MatDialog } from "@angular/material/dialog";

import { WcmOperation, JsonForm, WcmService, Category } from "bpw-wcm-service";
import * as fromStore from "bpw-wcm-service";
import { WcmNavigatorComponent } from "../../components/wcm-navigator/wcm-navigator.component";
import { NewCategoryDialogComponent } from "../../dialog/new-category-dialog/new-category-dialog.component";

@Component({
  selector: "category-tree",
  templateUrl: "./category-tree.component.html",
  styleUrls: ["./category-tree.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: wcmAnimations
})
export class CategoryTreeComponent extends WcmNavigatorComponent
  implements OnInit, OnDestroy {
  functionMap: { [key: string]: Function } = {};
  jsonFormMap: { [key: string]: JsonForm } = {};
  constructor(
    protected wcmService: WcmService,
    protected store: Store<fromStore.WcmAppState>,
    protected matDialog: MatDialog
  ) {
    super(wcmService, store, matDialog);
  }

  ngOnInit() {
    this.rootNode = "category";
    this.rootNodeType = "bpw:categoryFolder";
    this.functionMap["Create.category"] = this.createCategory;
    this.functionMap["Purge.category"] = this.removeItem;
    this.nodeFilter = {
      nodePath: "",
      nodeTypes: ["bpw:category"]
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

  createCategory() {
    const node = this.activeNode;

    const library =
      node.nodeType === "bpw:categoryFolder"
        ? node.wcmPath.split("/", 5)[2]
        : node.wcmPath.split("/", 6)[3];

    const parent =
      node.nodeType === "bpw:categoryFolder"
        ? ""
        : node.wcmPath.substring(
            `/bpwizard/library/${library}/category/`.length
          );

    let dialogRef = this.matDialog.open(NewCategoryDialogComponent, {
      panelClass: "category-new-dialog",
      data: {
        jsonFormObject: this.jsonFormMap[
          "/bpwizard/library/system/authoringTemplate/categoryType"
        ].formSchema,
        repositoryName: node.repository,
        workspaceName: node.workspace,
        library: library,
        properties: {
          name: "a category",
          parent: parent
        }
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      this.load(node);
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
