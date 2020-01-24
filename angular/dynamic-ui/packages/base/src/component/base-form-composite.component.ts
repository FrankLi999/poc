import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    BaseFormControlComponent,
    BaseFormControlEvent,
    BaseFormControlEventType
} from "./base-form-control.component";
import {
  BaseComponent,
} from "./base.component";
import {
    ComponentModel
} from "../model/form/component.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";

export abstract class BaseFormCompositeComponent extends BaseFormControlComponent {
  type = 'composite';
  trackByFn(_index: number, model: ComponentModel): string {
      return model.key;
  }

  onEvent($event: BaseFormControlEvent, type: BaseFormControlEventType) {
    switch (type) {
      case BaseFormControlEventType.Blur:
          this.blur.emit($event);
          break;

      case BaseFormControlEventType.Change:
          this.change.emit($event);
          break;

      case BaseFormControlEventType.Focus:
          this.focus.emit($event);
          break;
      case BaseFormControlEventType.Custom:
          this.customEvent.emit($event);
          break;
    }
  }
}
