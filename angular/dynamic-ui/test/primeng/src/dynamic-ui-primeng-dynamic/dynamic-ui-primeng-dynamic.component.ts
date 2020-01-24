import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren,
    ChangeDetectorRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import {
    PrimengComponentTypes
  } from "../dynamic-ui-primeng.model";
import {
    BaseComponent,
    BaseFormControlComponent,
    BaseFormControlEvent,
    ComponentTemplateDirective,
    ComponentModel,
    Utils
} from "@bpw-ui/base";
import { DynamicUIPrimengFormControlComponent } from "../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component";

@Component({
    selector: "dynamic-ui-primeng-dynamic-component",
    template: `{{htmlTemplate}}`
})
export class DynamicUIPrimengDynamicComponent  extends BaseComponent  {
    @Input() group: FormGroup;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;
    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
    @ViewChildren(DynamicUIPrimengFormControlComponent) components: QueryList<DynamicUIPrimengFormControlComponent>;
    type = "columns";
    private htmlTemplate = '';
    componentRef: ComponentRef<BaseFormControlComponent>;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
        protected changeDetectorRef: ChangeDetectorRef) {
      super(changeDetectorRef);
    }

    ngOnInit() {
      super.ngOnInit();
      const type = DynamicUIPrimengFormControlComponent.getFormControlType(this.model);
      try {
          const typ = PrimengComponentTypes[type];
          this.viewContainerRef.clear();
          const compFactory = this.cfr.resolveComponentFactory(typ);
          this.componentRef = this.viewContainerRef.createComponent(compFactory);
          const vc = this.componentRef.instance;
          vc.componentId = this.componentId;
          vc.context = this.context;
          vc.group = this.group;
          vc.model = this.model;
          vc.nestedTemplates = this.nestedTemplates;
          vc.blur = this.blur;
          vc.change = this.change;
          vc.focus = this.focus;
          vc.setupControl();
        } catch (ex) {
          // if(ex === NoComponentFactoryError) {
          this.htmlTemplate = ex.toString();
          // }
          Utils.err(ex);
        }
    }
  }
