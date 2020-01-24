import {
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
import { FormioFormControlModel } from "../model/formio-form-control.model";
import { FormioFormValueControlModel, FormioFormControlValue } from "../model/formio-form-value-control.model";
import { FormioFormControlRelationGroup } from "../model/formio-form-control-relation.model";
import { FormioFormArrayGroupModel } from "../model/form-array/formio-form-array.model";
import {
    FormioInputModel,
    FORMIO_FORM_CONTROL_TYPE_INPUT,
    FORMIO_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/formio-input.model";
import {
    ComponentModel
} from "../model/form/formio-component.model";
import { FormioTemplateDirective } from "../directive/formio-template.directive";
import { Utils } from "../utils/core.utils";
import { RelationUtils } from "../utils/relation.utils";
import { FormioNg2DynamicFormValidationService } from "../service/formio-ng2-dynamic-form-validation.service";
import { FormioBaseComponent } from './formio-base.component';

export interface FormioFormControlEvent {

    $event: Event | FocusEvent | FormioFormControlEvent | any;
    context: FormioFormArrayGroupModel | ComponentModel | null;
    control: FormControl;
    group: FormGroup;
    model: FormioFormControlModel | ComponentModel;
}

export enum FormioFormControlEventType {
    Blur = 0,
    Change = 1,
    Focus = 2
}

export abstract class FormioFormControlComponent extends FormioBaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

    bindId: boolean;
    context: FormioFormArrayGroupModel| ComponentModel | null;
    control: FormControl;
    group: FormGroup;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: FormioFormControlModel | ComponentModel;
    nestedTemplates: QueryList<FormioTemplateDirective> | null = null;

    contentTemplates: QueryList<FormioTemplateDirective>;
    template: FormioTemplateDirective;

    blur: EventEmitter<FormioFormControlEvent>;
    change: EventEmitter<FormioFormControlEvent>;
    //filter: EventEmitter<FormioFormControlEvent>;
    focus: EventEmitter<FormioFormControlEvent>;

    private subscriptions: Subscription[] = [];

    abstract type: number | string | null;

    constructor(protected validationService: FormioNg2DynamicFormValidationService) { 
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!Utils.isDefined(this.group)) {
            throw new Error(`no [group] input set for FormioFormControlComponent`);
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
            if (this.group) {
                this.control = this.group.get(this.getModelId()) as FormControl;
                if (this.model instanceof FormioFormValueControlModel) {
                    this.subscriptions.push(this.control.valueChanges.subscribe(value => this.onControlValueChanges(value)));
                }
            }
            if (this.model instanceof FormioFormValueControlModel) {
                let model = this.model as FormioFormValueControlModel<FormioFormControlValue>;
                this.subscriptions.push(model.disabledUpdates.subscribe(value => this.onModelDisabledUpdates(value)));
                this.subscriptions.push(model.valueUpdates.subscribe(value => this.onModelValueUpdates(value)));           
            }

            if (this.model.relation && this.model.relation.length > 0) {
                this.setControlRelations();
            }
        }
    }

    get errorMessages(): string[] {
        if (this.hasErrorMessaging && this.model.hasErrorMessages) {
            if (this.model instanceof FormioFormControlModel) {
                return this.validationService.createErrorMessages(this.control, this.model as FormioFormControlModel);
            } else {
                return [];
            }            
        }
        return [];
    }

    get hasHint(): boolean { // needed for AOT
        return (this.model as FormioInputModel).hint !== null;
    }

    get hasList(): boolean { // needed for AOT
        return (this.model as FormioInputModel).list !== null;
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
        if (this.model instanceof FormioFormControlModel) {
            let relActivation = RelationUtils.findActivationRelation(this.model.relation);

            if (relActivation) {

                this.updateModelDisabled(relActivation);

                RelationUtils.getRelatedFormControls(this.model, this.group).forEach(control => {

                    this.subscriptions.push(control.valueChanges.subscribe(() => this.updateModelDisabled(relActivation)));
                    this.subscriptions.push(control.statusChanges.subscribe(() => this.updateModelDisabled(relActivation)));
                });
            }
        }
    }

    updateModelDisabled(relation: FormioFormControlRelationGroup): void {

        this.model.disabledUpdates.next(RelationUtils.isFormControlToBeDisabled(relation, this.group));
    }

    unsubscribe(): void {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

    onControlValueChanges(value: FormioFormControlValue): void {

        if (this.model instanceof FormioFormValueControlModel) {
            let model = this.model as FormioFormValueControlModel<FormioFormControlValue>;
            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
    }

    onModelValueUpdates(value: FormioFormControlValue): void {

        if (this.control.value !== value
        ) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onValueChange($event: Event | FormioFormControlEvent | any): void {

        if ($event && $event instanceof Event) { // native HTML5 change event

            ($event as Event).stopPropagation();

            if (this.model.type === FORMIO_FORM_CONTROL_TYPE_INPUT) {

                let model = this.model as FormioInputModel;

                if (model.inputType === FORMIO_FORM_CONTROL_INPUT_TYPE_FILE) {

                    let inputElement: any = ($event as Event).target || ($event as Event).srcElement;

                    model.files = inputElement.files as FileList;
                }
            }

            this.change.emit(
                {
                    $event: $event as Event,
                    context: this.context,
                    control: this.control,
                    group: this.group,
                    model: this.model
                }
            );

        }
        else if ($event && $event.hasOwnProperty("$event") && $event.hasOwnProperty("control") && $event.hasOwnProperty("model")) {

            this.change.emit($event as FormioFormControlEvent);

        } else {

            this.change.emit(
                {
                    $event: $event,
                    context: this.context,
                    control: this.control,
                    group: this.group,
                    model: this.model
                }
            );
        }
    }

    onFilterChange($event: any | FormioFormControlEvent): void {
        // TODO
    }

    onFocusChange($event: FocusEvent | FormioFormControlEvent): void {

        let emitValue;

        if ($event instanceof FocusEvent) {

            $event.stopPropagation();

            emitValue = {
                $event: $event,
                context: this.context,
                control: this.control,
                group: this.group,
                model: this.model
            };

            if ($event.type === "focus") {

                this.hasFocus = true;
                this.focus.emit(emitValue);

            } else {

                this.hasFocus = false;
                this.blur.emit(emitValue);
            }

        } else {

            emitValue = $event as FormioFormControlEvent;

            (emitValue.$event as FocusEvent).type === "focus" ? this.focus.emit(emitValue) : this.blur.emit(emitValue);
        }
    }
}