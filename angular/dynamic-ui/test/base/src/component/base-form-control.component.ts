import {
    AfterViewInit,
    EventEmitter,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChange,
    SimpleChanges,
    ChangeDetectorRef
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import {
  ComponentModel
} from "../model/form/component.model";
import {
  DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD,
  DYNAMIC_UI_COMPONENT_TYPE_FILE
} from "../model/form/form.model";
import { ComponentTemplateDirective } from "../directive/component-template.directive";
import { Utils } from "../utils/core.utils";
import { DynamicUIFormValidationService } from "../service/dynamic-ui-form-validation.service";
import { BaseComponent } from './base.component';


export interface BaseFormControlEvent {
  $event: Event | FocusEvent | BaseFormControlEvent | any;
  context: ComponentModel | null;
  control: FormControl;
  group: FormGroup;
  model: ComponentModel;
  type: string;
}

export enum BaseFormControlEventType {
  Blur = 1,
  Change = 2,
  Focus = 3,
  Custom = 4
}
export abstract class BaseFormControlComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    control: FormControl;
    group: FormGroup;
    hasErrorMessaging = false;
    model: ComponentModel;

    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    customEvent: EventEmitter<BaseFormControlEvent>;

    private subscriptions: Subscription[] = [];

    constructor(
      protected changeDetectorRef: ChangeDetectorRef,
      protected validationService: DynamicUIFormValidationService) {
        super(changeDetectorRef);
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes["model"] || changes["group"] ) {
        this.setupControl();
      }
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!Utils.isDefined(this.group)) {
            throw new Error(`no [group] input set for DynamicUIFormControlComponent`);
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.unsubscribe();
    }

    setupControl() {
        super.setupControl();
        if (this.model) {
            this.unsubscribe();
            if (this.model.relation && this.model.relation.length > 0) {
                this.setControlRelations();
            }
        }
    }

    get errorMessages(): string[] {
        if (this.hasErrorMessaging && this.model.hasErrorMessages) {
            // TODO
            return [];
        }
        return [];
    }

    get hasHint(): boolean { // needed for AOT
        // TODO
        return false;
    }

    get hasList(): boolean { // needed for AOT
        // TODO
        return false;
    }

    get isInvalid(): boolean {
        return this.control.touched && this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.control.touched && !this.hasFocus && this.isInvalid;
    }

    protected setControlRelations(): void {
        //TODO
    }

    unsubscribe(): void {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onFilterChange($event: any | BaseFormControlEvent): void {
        // TODO
    }

    onValueChange($event: Event | BaseFormControlEvent | any): void {

        if ($event && $event instanceof Event) { // native HTML5 change event

            if (this.model.type === DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD) {

                let model = this.model as ComponentModel;

                if (model.inputType === DYNAMIC_UI_COMPONENT_TYPE_FILE) {

                    let inputElement: any = ($event as Event).target || ($event as Event).srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(this.createEvent($event as Event, "change"));

        } else if ($event && $event.hasOwnProperty("$event")) { // event bypass

            this.change.emit($event as BaseFormControlEvent);

        } else { // custom library value change event

            this.change.emit(this.createEvent($event, "change"));
        }
    }


    onBlur($event: FocusEvent | BaseFormControlEvent | any): void {

        if ($event && $event.hasOwnProperty("$event")) { // event bypass

            this.blur.emit($event as BaseFormControlEvent);

        } else { // native HTML 5 or UI library blur event

            this.hasFocus = false;
            this.blur.emit(this.createEvent($event, "blur"));
        }
    }


    onFocus($event: FocusEvent | BaseFormControlEvent | any): void {

        if ($event && $event.hasOwnProperty("$event")) { // event bypass

            this.focus.emit($event as BaseFormControlEvent);

        } else { // native HTML 5 or UI library focus event

            this.hasFocus = true;
            this.focus.emit(this.createEvent($event, "focus"));
        }
    }


    onCustomEvent($event: any, type: string | null = null): void {

        if ($event && $event.hasOwnProperty("$event") && $event.hasOwnProperty("type")) { // child event bypass

            this.customEvent.emit($event as BaseFormControlEvent);

        } else { // native UI library custom event

            this.customEvent.emit(this.createEvent($event, type));
        }
    }

    protected createEvent($event: any, type: string): BaseFormControlEvent {
      return {$event, context: this.context, control: this.control, group: this.group, model: this.model, type};
    }
}
