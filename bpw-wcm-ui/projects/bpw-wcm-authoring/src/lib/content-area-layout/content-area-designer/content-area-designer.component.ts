import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Input
} from "@angular/core";
import cloneDeep from "lodash-es/cloneDeep";
import { select, Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { wcmAnimations } from "bpw-common";
import { Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { WcmConfigurableComponent } from "../../components/wcm-configurable.component";
import {
  WcmConfigService,
  CreateNewContentAreaLayout,
  WcmAppState,
  ContentAreaLayout,
  getContentAreaLayouts,
  CreateContentAreaLayoutSuccess
} from "bpw-wcm-service";
@Component({
  selector: "content-area-designer",
  templateUrl: "./content-area-designer.component.html",
  styleUrls: ["./content-area-designer.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: wcmAnimations
})
export class ContentAreaDesignerComponent extends WcmConfigurableComponent
  implements OnInit, OnDestroy {
  @Input() layoutName: string;
  @Input() editing: boolean = false;
  @Input() repository: string;
  @Input() workspace: string;
  @Input() library: string;
  sub: Subscription;
  private unsubscribeAll: Subject<any>;
  constructor(
    private wcmConfigService: WcmConfigService,
    private store: Store<WcmAppState>,
    private route: ActivatedRoute
  ) {
    super(wcmConfigService);
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(param => {
      this.repository = param.repository;
      this.workspace = param.workspace;
      this.library = param.library;
      this.layoutName = param.layoutName;
      this.editing = param.editing === "true";

      if (this.editing) {
        this.store
          .pipe(takeUntil(this.unsubscribeAll), select(getContentAreaLayouts))
          .subscribe(
            (contentAreaLayouts: { [key: string]: ContentAreaLayout }) => {
              if (contentAreaLayouts) {
                const layout: ContentAreaLayout = cloneDeep(
                  contentAreaLayouts[
                    `/bpwizard/library/${this.library}/contentAreaLayout/${this.layoutName}`
                  ]
                );
                this.store.dispatch(new CreateContentAreaLayoutSuccess(layout));
              }
            }
          );
      } else {
        this.store.dispatch(
          new CreateNewContentAreaLayout(
            this.repository,
            this.workspace,
            this.library
          )
        );
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
