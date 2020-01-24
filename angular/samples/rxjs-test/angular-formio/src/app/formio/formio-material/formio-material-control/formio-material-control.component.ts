import { 
  Component, 
  OnInit, 
  AfterViewInit,
  OnDestroy,
  Input, 
  Output,
  ContentChildren,
  ViewContainerRef, 
  ComponentFactoryResolver, 
  Type,
  QueryList,
  EventEmitter,
  ComponentRef
} from '@angular/core';
import { FormGroup } from "@angular/forms";

import {
  FormioFormControlComponent,
  FormioFormControlModel,
  FormioFormArrayGroupModel,
  FormioFormControlEvent,
  FormioTemplateDirective
} from "../../formio-core";
import { Utils } from '../../formio-core/utils/core.utils';
import { FormioMaterialFormControlComponent } from "../formio-material-form-control.component";
import { MatFormControlType } from "../formio-material-form.const";
import { MaterialComponentTypes } from "../formio-material.model";

@Component({
selector: 'formio-material-control',
  template: `{{htmlTemplate}}`
})
export class FormioMaterialControlComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() bindId: boolean = true;
  @Input() context: FormioFormArrayGroupModel = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: FormioFormControlModel;
  @Input() nestedTemplates: QueryList<FormioTemplateDirective>;

  @Input() showCharacterHint: boolean;

  @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
  @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;
  htmlTemplate: string;
  componentRef: ComponentRef<FormioMaterialFormControlComponent>;

  constructor(
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const type = FormioMaterialFormControlComponent.getFormControlType(this.model);
    try {
        const typ = MaterialComponentTypes[type];
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
        vc.showCharacterHint = this.showCharacterHint;
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

