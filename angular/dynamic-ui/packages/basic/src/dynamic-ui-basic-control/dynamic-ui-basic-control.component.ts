import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  EventEmitter,
  Output,
  QueryList,
  ComponentRef,
  ContentChildren,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import {
  ComponentModel,
  BaseFormControlComponent,
  BaseFormControlEvent,
  ComponentTemplateDirective,
  DynamicUIFormValidationService,
  Utils
} from "@bpw-ui/base";

import {
  DynamicUIBasicFormControlComponent,
  DynamicUIBasicFormControlType
} from "../dynamic-ui-basic-form-control/dynamic-ui-basic-form-control.component";
import {
  DynamicUIBasicComponentTypes
} from "../dynamic-ui-basic.model";

@Component({
  selector: 'dynamic-ui-basic-control',
  template: `{{htmlTemplate}}`
})
export class DynamicUIBasicControlComponent extends BaseFormControlComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() componentId: boolean = true;
  @Input() context: ComponentModel = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: ComponentModel;
  @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;

  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
  componentRef: ComponentRef<DynamicUIBasicFormControlComponent>;
  htmlTemplate: string = '';
  type = 'control';

  constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }

  ngOnInit() {
    const type = DynamicUIBasicFormControlComponent.getFormControlType(this.model);
    try {
        const typ = DynamicUIBasicComponentTypes[type];
        this.viewContainerRef.clear();
        const compFactory = this.cfr.resolveComponentFactory(typ);
        this.componentRef = this.viewContainerRef.createComponent(compFactory);
        const vc = this.componentRef.instance;
        vc.componentId = this.componentId;
        vc.context = this.context;
        vc.group = this.group;
        vc.hasErrorMessaging = this.hasErrorMessaging;
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.componentRef.instance.contentTemplates = this.contentTemplates;
      this.componentRef.instance.setTemplates();
    }, 0); // setTimeout to trigger change detection
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  onEvent() {

  }
}
