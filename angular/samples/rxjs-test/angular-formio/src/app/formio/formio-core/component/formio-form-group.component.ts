import { EventEmitter, QueryList, SimpleChanges, OnChanges, AfterViewInit, SimpleChange } from "@angular/core";
import { FormGroup } from "@angular/forms";

import {
    FormioFormControlComponent,
    FormioFormControlEvent,
    FormioFormControlEventType
} from "./formio-control.component";
import {
    ComponentModel
} from "../model/form/formio-component.model";
import { FormioFormControlModel } from "../model/formio-form-control.model";
import { FormioTemplateDirective } from "../directive/formio-template.directive";

export abstract class FormioFormGroupComponent implements OnChanges, AfterViewInit {

    group: FormGroup;
    model: FormioFormControlModel | ComponentModel;
    components: QueryList<FormioFormControlComponent>;
    contentTemplates: QueryList<FormioTemplateDirective>;
    nestedTemplates: QueryList<FormioTemplateDirective>;

    template: FormioTemplateDirective;
    blur: EventEmitter<FormioFormControlEvent>;
    change: EventEmitter<FormioFormControlEvent>;
    focus: EventEmitter<FormioFormControlEvent>;

    ngOnChanges(changes: SimpleChanges) {   
        let groupChange = changes["group"] as SimpleChange,
            modelChange = changes["model"] as SimpleChange;
        if (groupChange || modelChange) {
            this.setupControl();
        }
    }

    ngAfterViewInit(): void {  
        setTimeout(() => this.setTemplates(), 0); // setTimeout to trigger change detection
    }

    trackByFn(_index: number, model: FormioFormControlModel): string {
        return model.id;
    }

    onEvent($event: FormioFormControlEvent, type: FormioFormControlEventType) {
        switch (type) {

            case FormioFormControlEventType.Blur:
                this.blur.emit($event);
                break;

            case FormioFormControlEventType.Change:
                this.change.emit($event);
                break;

            case FormioFormControlEventType.Focus:
                this.focus.emit($event);
                break;
        }
    }

    setupControl() {
        // if (this.model) {
        //     if (this.group) {
        //         this.control = this.group.get(this.getModelId()) as FormControl;
        //     }
        // }
    }

    get templates(): QueryList<FormioTemplateDirective> {
        return this.nestedTemplates ? this.nestedTemplates : this.contentTemplates;
    }

    setTemplates(): void {
        this.templates.forEach((template: FormioTemplateDirective) => {
            if (template.as === null && (template.modelType === 'group' || template.modelId === this.getModelId())) {
                this.template = template;
            }
        });
    }
  
    protected getModelId(): string {
        if (this.model instanceof FormioFormControlModel) {
            return (this.model as FormioFormControlModel).id;
        } else {
            return (this.model as ComponentModel).key;
        }
    }
}
