import {
    ChangeDetectorRef,
    AfterViewInit,
    EventEmitter,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChange,
    SimpleChanges
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import {
    ComponentModel
} from "../model/form/component.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";
import { Utils } from "../utils/core.utils";
export abstract class BaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  componentId: boolean;
  context: ComponentModel | null;
  hasFocus: boolean;
  model: ComponentModel;
  nestedTemplates: QueryList<ComponentTemplateDirective> | null = null;
  contentTemplates: QueryList<ComponentTemplateDirective>;
  template: ComponentTemplateDirective;

  abstract type: number | string | null;

  constructor(
      protected changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["model"] as SimpleChange) {
      this.setupControl();
    }
  }

  ngOnInit(): void {
      if (!Utils.isDefined(this.model)) {
          throw new Error(`no [model] input set for DynamicUIFormControlComponent`);
      }
  }

  ngAfterViewInit(): void {
      setTimeout(() => this.setTemplates(), 0); // setTimeout to trigger change detection
      this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
  }

  setupControl() {
  }

  get templates(): QueryList<ComponentTemplateDirective> {
      return this.nestedTemplates ? this.nestedTemplates : this.contentTemplates;
  }

  setTemplates(): void {
      this.templates.forEach((template: ComponentTemplateDirective) => {
          if (template.as === null && (template.modelType === this.model.type || template.modelId === this.getModelId())) {
              this.template = template;
          }
      });
  }

  protected getModelId(): string {
      return this.model.key;
  }

}
