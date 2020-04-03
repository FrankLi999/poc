import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil, switchMap, filter, map } from "rxjs/operators";
import { WcmConfigService } from "bpw-wcm-service";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
import * as fromStore from "bpw-wcm-service";
import { BpmnWorkflow, WcmService, JsonForm } from "bpw-wcm-service";

@Component({
  selector: "app-workflow",
  templateUrl: "./workflow.component.html",
  styleUrls: ["./workflow.component.scss"]
})
export class WorkflowComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() repository: string;
  @Input() workspace: string;
  @Input() nodePath: string;
  @Input() library: string;
  @Input() editing: boolean = false;
  @Input() workflow: BpmnWorkflow;

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
        switchMap(param => this.getWorkflow(param)),
        filter(workflow => workflow != null),
        switchMap(workflow => this.getJsonForm(workflow))
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

  getJsonForm(workflow: BpmnWorkflow): Observable<JsonForm> {
    this.workflow = workflow;
    this.formData = {
      properties: {
        name: workflow.name,
        title: workflow.title,
        description: workflow.description
      },
      elements: {
        bpmn: workflow.bpmn
      }
    };
    console.log("***************&&&&&&&&&&get validationRule", this.workflow);
    return this.store.pipe(
      select(fromStore.getJsonForms),
      map(jsonForms => {
        console.log(
          jsonForms[
            "bpwizard/library/system/authoringTemplate/bpmnWorkflowType"
          ],
          jsonForms
        );
        return jsonForms[
          "/bpwizard/library/system/authoringTemplate/bpmnWorkflowType"
        ];
      })
    );
  }

  getWorkflow(param: any): Observable<BpmnWorkflow> {
    this.nodePath = param.wcmPath;
    this.workspace = param.workspace;
    this.repository = param.repository;
    this.editing = param.editing === "true";
    this.library = param.library;
    console.log(
      ">>>>>getWorkflow--------: ",
      this.nodePath,
      this.workspace,
      this.repository,
      this.library,
      this.editing,
      param.editing
    );
    if (this.editing) {
      console.log(">>>> get Workflow");
      return this.wcmService.getBpmnWorkflow(
        this.repository,
        this.workspace,
        this.nodePath
      );
    } else {
      return of({
        repository: param.repository,
        workspace: param.workspace,
        library: this.library,
        name: "BpmnWorkflow",
        title: "Workflow Title",
        description: "Workflow Description",
        bpmn: ""
      });
    }
  }

  saveWorkflow(formData: any) {
    this.workflow.name = formData.properties.name;
    this.workflow.title = formData.properties.title;
    this.workflow.description = formData.properties.description;

    this.workflow.bpmn = formData.elements.bpmn;

    console.log("......save workflow:", formData, this.workflow, this.editing);
    if (this.editing) {
      this.wcmService
        .saveBpmnWorkflow(this.workflow)
        .subscribe((event: any) => {
          console.log(">>>>>>>>>> ...... saved BpmnWorkflow");
        });
    } else {
      this.wcmService
        .createBpmnWorkflow(this.workflow)
        .subscribe((event: any) => {
          console.log(">>>>>>>>>> ...... created BpmnWorkflow");
        });
    }
  }
}
