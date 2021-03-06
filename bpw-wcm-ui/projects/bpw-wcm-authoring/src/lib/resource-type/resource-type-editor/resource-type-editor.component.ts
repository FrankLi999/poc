import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { ControlField, AuthoringTemplate } from "bpw-wcm-service";
import { Subject, Observable, of } from "rxjs";
import { takeUntil, switchMap, filter } from "rxjs/operators";
import * as fromStore from "bpw-wcm-service";
import { WcmService } from "bpw-wcm-service";
import { WcmConfigService } from "bpw-wcm-service";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
@Component({
  selector: "resource-type-editor",
  templateUrl: "./resource-type-editor.component.html",
  styleUrls: ["./resource-type-editor.component.scss"]
})
export class ResourceTypeEditorComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() repository: string;
  @Input() workspace: string;
  @Input() wcmPath: string;
  @Input() editing: boolean;
  @Input() library: string;
  controlFields: ControlField[] = [];
  resourceType: AuthoringTemplate;
  private unsubscribeAll: Subject<any>;
  error: string;
  constructor(
    private wcmConfigService: WcmConfigService,
    private wcmService: WcmService,
    private route: ActivatedRoute,
    private store: Store<fromStore.WcmAppState>
  ) {
    super(wcmConfigService);
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.store
      .pipe(
        takeUntil(this.unsubscribeAll),
        select(fromStore.getCreateRenderTemplateError)
      )
      .subscribe((error: string) => {
        this.error = error;
      });
    this.store
      .pipe(takeUntil(this.unsubscribeAll), select(fromStore.getControlFiels))
      .subscribe((controlFiels: ControlField[]) => {
        if (controlFiels) {
          this.controlFields = controlFiels;
        }
      });

    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribeAll),
        switchMap(param => this.getAuthoringTemplate(param)),
        filter(authoringTemplate => authoringTemplate != null)
      )
      .subscribe(authoringTemplate => {
        console.log(">>>> authoringTemplate", authoringTemplate);
        this.resourceType = authoringTemplate;
      });
  }

  getAuthoringTemplate(param: any): Observable<AuthoringTemplate> {
    this.wcmPath = param.wcmPath;
    this.workspace = param.workspace;
    this.repository = param.repository;
    this.library = param.library;
    this.editing = param.editing === "true";
    if (this.editing) {
      return this.wcmService.getAuthoringTemplate(
        this.repository,
        this.workspace,
        this.wcmPath
      );
    } else {
      return of({
        repository: param.repository,
        workspace: param.workspace,
        library: param.library,
        name: "Resource Type name",
        title: "Title",
        description: "Content type",
        baseResourceType: "Content",
        workflow: "System",
        categories: [],
        publishDate: new Date(2019, 0, 1),
        propertyRow: {
          rowName: "property-row",
          rowTitle: "property-row",
          columns: [
            {
              id: "property-column",
              fxFlex: 100,
              // formControls: TemplateField[];
              formControls: [
                "properties.name",
                "properties.title",
                "properties.description",
                "properties.categories",
                "properties.workflow"
              ]
            }
          ]
        },
        elementGroups: [],
        elements: {},
        properties: {
          name: {
            name: "name",
            title: "Name",
            controlName: "text",
            dataType: "Text",
            valditionRegEx: "[^(<[.\n]+>)]*",
            mandatory: true,
            systemIndexed: true,
            userSearchable: true,
            showInList: true
          },
          title: {
            name: "title",
            title: "Title",
            controlName: "text",
            dataType: "Text",
            valditionRegEx: "[^(<[.\n]+>)]*",
            mandatory: true,
            systemIndexed: true,
            userSearchable: true,
            showInList: true
          },
          description: {
            name: "description",
            title: "Description",
            controlName: "text",
            dataType: "Text",
            systemIndexed: true
          },
          categories: {
            name: "categories",
            title: "Category",
            controlName: "category",
            userSearchable: true
          },
          workflow: {
            name: "workflow",
            title: "Workflow",
            controlName: "text",
            dataType: "Text",
            valditionRegEx: "[^(<[.\n]+>)]*",
            mandatory: true,
            systemIndexed: true,
            userSearchable: true,
            showInList: true
          }
        }
      });
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.error &&
      this.store.dispatch(new fromStore.AuthoringTemplateClearError());
  }
}
