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
  ContentChildren
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import {
  FormioFormControlModel,
  FormioFormArrayGroupModel,
  FormioFormControlComponent,
  FormioFormControlEvent,
  FormioTemplateDirective
} from "../../formio-core";
import { Utils } from '../../formio-core/utils/core.utils';
import { 
  FormioBasicFormControlComponent,
  FormioBasicFormControlType
} from "../formio-basic-form-control.component";
import {
  FormioBasicComponentTypes
} from "../formio-basic.model";

@Component({
  selector: 'formio-basic-control',
  template: `{{htmlTemplate}}`
})
export class FormioBasicControlComponent implements OnInit, AfterViewInit, OnDestroy {

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
  componentRef: ComponentRef<FormioBasicFormControlComponent>;
  htmlTemplate: string = '';
  
  constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver) {
  }
  
   ngOnInit() {
    const type = FormioBasicFormControlComponent.getFormControlType(this.model);
    try {
        const typ = FormioBasicComponentTypes[type];
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
