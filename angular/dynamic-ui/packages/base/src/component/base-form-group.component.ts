import {
  EventEmitter,
  QueryList,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  SimpleChange,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import {
  DynamicUIFormValidationService
} from '../service/dynamic-ui-form-validation.service';
import {
    BaseFormControlComponent,
} from "./base-form-control.component";
import {
  BaseFormCompositeComponent
} from './base-form-composite.component';
import {
    ComponentModel
} from "../model/form/component.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";

export abstract class BaseFormGroupComponent extends BaseFormCompositeComponent implements OnChanges, AfterViewInit {
    type= 'group';
    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["group"] || changes["model"]) {
            this.setupControl();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.setTemplates(), 0);
    }

    setupControl() {
        // if (this.model) {
        //     if (this.group) {
        //         this.control = this.group.get(this.getModelId()) as FormControl;
        //     }
        // }
    }

    get templates(): QueryList<ComponentTemplateDirective> {
        return this.nestedTemplates ? this.nestedTemplates : this.contentTemplates;
    }

    setTemplates(): void {
        this.templates.forEach((template: ComponentTemplateDirective) => {
            if (template.as === null && (template.modelType === 'group' || template.modelId === this.getModelId())) {
                this.template = template;
            }
        });
    }

    protected getModelId(): string {
        return this.model.key;
    }
}
