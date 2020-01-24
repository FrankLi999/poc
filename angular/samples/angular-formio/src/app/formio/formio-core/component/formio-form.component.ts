import { EventEmitter, QueryList } from "@angular/core";
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

export abstract class FormioFormComponent {

    group: FormGroup;
    model: FormioFormControlModel[] | Array<ComponentModel>;

    components: QueryList<FormioFormControlComponent>;
    nestedTemplates: QueryList<FormioTemplateDirective>;

    blur: EventEmitter<FormioFormControlEvent>;
    change: EventEmitter<FormioFormControlEvent>;
    focus: EventEmitter<FormioFormControlEvent>;

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
}
