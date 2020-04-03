import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil, switchMap, filter, map } from "rxjs/operators";
import { WcmConfigService } from "bpw-wcm-service";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
import * as fromStore from "bpw-wcm-service";
import { QueryStatement, WcmService, JsonForm } from "bpw-wcm-service";

@Component({
  selector: "query-statement",
  templateUrl: "./query-statement.component.html",
  styleUrls: ["./query-statement.component.scss"]
})
export class QueryStatementComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() repository: string;
  @Input() workspace: string;
  @Input() nodePath: string;
  @Input() library: string;
  @Input() editing: boolean = false;
  @Input() queryStatement: QueryStatement;

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
  formData: any;
  private unsubscribeAll: Subject<any>;
  constructor(
    wcmConfigService: WcmConfigService,
    private route: ActivatedRoute,
    private wcmService: WcmService,
    private store: Store<fromStore.WcmAppState>
  ) {
    super(wcmConfigService);
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        takeUntil(this.unsubscribeAll),
        switchMap(param => this.getQueryStatement(param)),
        filter(queryStatement => queryStatement != null),
        switchMap(queryStatement => this.getJsonForm(queryStatement))
      )
      .subscribe(jsonForm => (this.jsonForm = jsonForm));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getQueryStatement(param: any): Observable<QueryStatement> {
    this.nodePath = param.wcmPath;
    this.workspace = param.workspace;
    this.repository = param.repository;
    this.editing = param.editing === "true";
    this.library = param.library;
    if (this.editing) {
      return this.wcmService.getQueryStatement(
        this.repository,
        this.workspace,
        this.nodePath
      );
    } else {
      return of({
        repository: param.repository,
        workspace: param.workspace,
        library: this.library,
        name: "Query Statement",
        title: "Title",
        query: "Query"
      });
    }
  }

  getJsonForm(queryStatement: QueryStatement): Observable<JsonForm> {
    this.queryStatement = queryStatement;
    this.formData = {
      properties: {
        name: queryStatement.name,
        title: queryStatement.title
      },
      elements: {
        query: queryStatement.query
      }
    };
    return this.store.pipe(
      select(fromStore.getJsonForms),
      map(jsonForms => {
        return jsonForms[
          "/bpwizard/library/system/authoringTemplate/queryStatementType"
        ];
      })
    );
  }

  saveQueryStatement(formData: any) {
    this.queryStatement.name = formData.properties.name;
    this.queryStatement.title = formData.properties.title;
    this.queryStatement.query = formData.elements.query;
    if (this.editing) {
      this.wcmService
        .saveQueryStatement(this.queryStatement)
        .subscribe((event: any) => {
          // console.log(">>>>>>>>>> ...... saved queryStatement");
        });
    } else {
      this.wcmService
        .createQueryStatement(this.queryStatement)
        .subscribe((event: any) => {
          // console.log(">>>>>>>>>> ...... created queryStatement");
        });
    }
  }
}
