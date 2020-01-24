import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  EventEmitter,
  QueryList,
  ContentChildren,
  ComponentRef
} from '@angular/core';
import {FormGroup} from "@angular/forms";

import { DynamicUIPrimengFormControlComponent } from '../dynamic-ui-primeng-form-control/dynamic-ui-primeng-form-control.component';
import {
  DynamicUIFormValidationService,
  ComponentModel,
  BaseFormControlEvent,
  ComponentTemplateDirective,
  Utils
} from "@bpw-ui/base";
import {
  PrimengComponentTypes
} from "../dynamic-ui-primeng.model";


@Component({
selector: 'dynamic-ui-primeng-control',
  template: `{{htmlTemplate}}`
})
export class DynamicUIPrimengControlComponent implements OnInit, AfterViewInit, OnDestroy {

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
  htmlTemplate = '';
  componentRef: ComponentRef<DynamicUIPrimengFormControlComponent>;
  constructor(
     private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver) {
 }

  ngOnInit() {
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

