import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, Observable, of } from "rxjs";
import { switchMap, map, filter } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import cloneDeep from "lodash-es/cloneDeep";
import { JsonForm, ContentItem } from "bpw-wcm-service";
import * as fromStore from "bpw-wcm-service";
import { WcmService } from "bpw-wcm-service";
import { WcmConfigService } from "bpw-wcm-service";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
@Component({
  selector: "new-content-item",
  templateUrl: "./content-item.component.html",
  styleUrls: ["./content-item.component.scss"]
})
export class ContentItemComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() repository: string;
  @Input() workspace: string;
  @Input() nodePath: string;
  @Input() editing: boolean = false;
  @Input() contentItem: ContentItem;
  contentItemData: any = {};
  sub: Subscription;
  jsonForm: JsonForm;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true } // Show inline feedback icons
  };
  selectedFramework = "material-design";
  selectedLanguage = "en";
  constructor(
    wcmConfigService: WcmConfigService,
    private wcmService: WcmService,
    private route: ActivatedRoute,
    private store: Store<fromStore.WcmAppState>
  ) {
    super(wcmConfigService);
  }

  ngOnInit() {
    console.log("NewContentItemComponent forkJoin");
    this.sub = this.route.queryParams
      .pipe(
        switchMap(param => this.getContentItem(param)),
        filter(contentItem => contentItem != null),
        switchMap(contentItem => this.getJsonForms(contentItem))
      )
      .subscribe(jsonForm => (this.jsonForm = jsonForm));
  }

  getContentItem(param: any): Observable<ContentItem> {
    this.nodePath = param.nodePath;
    this.workspace = param.workspace;
    this.repository = param.repository;
    this.editing = param.editing === "true";
    if (this.editing) {
      return this.wcmService.getContentItem(
        this.repository,
        this.workspace,
        this.nodePath
      );
    } else {
      return of({
        id: "",
        repository: param.repository,
        workspace: param.workspace,
        nodePath: param.nodePath,
        authoringTemplate: param.authoringTemplate,
        locked: false,
        lifeCycleStage: "darft",
        checkedOut: false,
        workflow: "bpmn:wcm_content_flow",
        properties: {},
        elements: {}
      });
    }
  }
  getJsonForms(contentItem: ContentItem): Observable<JsonForm> {
    this.contentItem = contentItem;
    this.contentItemData = this.getContentItemData(contentItem);
    console.log("getContentItem", contentItem);
    return this.store.pipe(
      select(fromStore.getJsonForms),
      map(jsonForms => {
        console.log(jsonForms[this.contentItem.authoringTemplate]);
        return jsonForms[this.contentItem.authoringTemplate];
      })
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createContent(formData: any) {
    console.log("formData", formData);
    // editing;
    const contentItem: ContentItem = {
      id: this.contentItem.id,
      elements: { ...formData.elements },
      properties: { ...formData.properties },
      repository: this.repository,
      locked: this.contentItem.locked,
      lifeCycleStage: this.contentItem.lifeCycleStage,
      checkedOut: this.contentItem.checkedOut,
      nodePath: this.nodePath,
      workspace: this.workspace,
      authoringTemplate: this.contentItem.authoringTemplate
    };
    console.log("contentItem", contentItem);
    if (this.editing) {
      this.wcmService.updateContentItem(contentItem).subscribe((event: any) => {
        console.log(event);
      });
    } else {
      this.wcmService
        .createAndPublishContentItem(contentItem)
        .subscribe((event: any) => {
          console.log(event);
        });
    }
  }

  private getContentItemData(contentItem: ContentItem) {
    return {
      properties: cloneDeep(contentItem.properties),
      elements: cloneDeep(contentItem.elements)
    };
  }
}
