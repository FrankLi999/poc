import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil, switchMap, filter, map } from "rxjs/operators";
import { WcmConfigService } from "bpw-wcm-service";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
import * as fromStore from "bpw-wcm-service";
import { ValidationRule, WcmService, JsonForm } from "bpw-wcm-service";

@Component({
  selector: "validation-rule",
  templateUrl: "./validation-rule.component.html",
  styleUrls: ["./validation-rule.component.scss"]
})
export class ValidationRuleComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() repository: string;
  @Input() workspace: string;
  @Input() nodePath: string;
  @Input() library: string;
  @Input() editing: boolean = false;
  @Input() validationRule: ValidationRule;

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
        switchMap(param => this.getValidationRule(param)),
        filter(validationRule => validationRule != null),
        switchMap(validationRule => this.getJsonForm(validationRule))
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

  getJsonForm(validationRule: ValidationRule): Observable<JsonForm> {
    this.validationRule = validationRule;
    this.formData = {
      properties: {
        name: validationRule.name,
        title: validationRule.title,
        description: validationRule.description
      },
      elements: {
        type: validationRule.type,
        rule: validationRule.rule
      }
    };
    return this.store.pipe(
      select(fromStore.getJsonForms),
      map(jsonForms => {
        console.log(
          jsonForms[
            "/bpwizard/library/system/authoringTemplate/validationRuleType"
          ],
          jsonForms
        );
        return jsonForms[
          "/bpwizard/library/system/authoringTemplate/validationRuleType"
        ];
      })
    );
  }

  getValidationRule(param: any): Observable<ValidationRule> {
    this.nodePath = param.wcmPath;
    this.workspace = param.workspace;
    this.repository = param.repository;
    this.editing = param.editing;
    this.library = param.library;
    if (this.editing) {
      console.log(">>>> get validation rule");
      return this.wcmService.getValidationRule(
        this.repository,
        this.workspace,
        this.nodePath
      );
    } else {
      return of({
        repository: param.repository,
        workspace: param.workspace,
        library: this.library,
        name: "ValidationRule",
        title: "Validatio Rule Title",
        description: "Validatio Rule Description",
        resourceName: "",
        type: "",
        rule: ""
      });
    }
  }

  saveValidationRule(formData: any) {
    this.validationRule.name = formData.properties.name;
    this.validationRule.title = formData.properties.title;
    this.validationRule.description = formData.properties.description;

    this.validationRule.type = formData.elements.type;
    this.validationRule.rule = formData.elements.rule;

    if (this.editing) {
      this.wcmService
        .saveValidationRule(this.validationRule)
        .subscribe((event: any) => {
          // console.log(">>>>>>>>>> ...... saved ValidationRule");
        });
    } else {
      this.wcmService
        .createValidationRule(this.validationRule)
        .subscribe((event: any) => {
          // console.log(">>>>>>>>>> ...... created ValidationRule");
        });
    }
  }
}
