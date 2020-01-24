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

import { FormioPrimengFormControlComponent } from '../formio-primeng-form-control.component';
import {
  PrimengComponentTypes
} from "../formio-primeng.model";
import {
  FormioFormControlComponent,
  FormioFormControlModel,
  FormioFormArrayGroupModel,
  FormioFormControlEvent,
  FormioTemplateDirective,  
  Utils
} from "../../formio-core";

@Component({
selector: 'formio-primeng-control',
  template: `{{htmlTemplate}}`
})
export class FormioPrimengControlComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() bindId: boolean = true;
  @Input() context: FormioFormArrayGroupModel = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: FormioFormControlModel;
  @Input() nestedTemplates: QueryList<FormioTemplateDirective>;

  @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;
  htmlTemplate = '';
  componentRef: ComponentRef<FormioPrimengFormControlComponent>;
  constructor(
     private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver) {
 }

  ngOnInit() {
    const type = FormioPrimengFormControlComponent.getFormControlType(this.model);
    try {
        const typ = PrimengComponentTypes[type];
        this.viewContainerRef.clear();
        const compFactory = this.cfr.resolveComponentFactory(typ);
        this.componentRef = this.viewContainerRef.createComponent(compFactory);
        const vc = this.componentRef.instance;
        vc.bindId = this.bindId;
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
}

