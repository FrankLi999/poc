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
  ComponentRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from "@angular/forms";

import {
  BaseFormControlComponent,
  ComponentModel,
  BaseFormControlEvent,
  ComponentTemplateDirective,
  DynamicUIFormValidationService,
  Utils
} from "@bpw-ui/base";
import { DynamicUIMaterialFormControlComponent } from "../dynamic-ui-material-form-control/dynamic-ui-material-form-control.component";
import { MatFormControlType } from "../dynamic-ui-material-form.const";
import { MaterialComponentTypes } from "../dynamic-ui-material.model";

@Component({
selector: 'dynamic-ui-material-control',
  template: `{{htmlTemplate}}`
})
export class DynamicUIMaterialControlComponent extends BaseFormControlComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() componentId: boolean = true;
  @Input() context: ComponentModel = null;
  @Input() group: FormGroup;
  @Input() hasErrorMessaging: boolean = false;
  @Input() model: ComponentModel;
  @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;

  @Input() showCharacterHint: boolean;

  @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
  @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;
  htmlTemplate: string;
  componentRef: ComponentRef<DynamicUIMaterialFormControlComponent>;
  type = 'dynamic-control';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {

      super(changeDetectorRef, validationService);
  }

  ngOnInit() {
    super.ngOnInit();
    const type = DynamicUIMaterialFormControlComponent.getFormControlType(this.model);
    try {
        const typ = MaterialComponentTypes[type];
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
    super.ngAfterViewInit();
    setTimeout(() => {
      this.componentRef.instance.contentTemplates = this.contentTemplates;
      this.componentRef.instance.setTemplates();
    }, 0); // setTimeout to trigger change detection
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.componentRef.destroy();
  }

}

