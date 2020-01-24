import { AfterViewInit, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ComponentModel } from "../model/form/component.model";
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
export declare enum BaseFormControlEventType {
    Blur = 1,
    Change = 2,
    Focus = 3,
    Custom = 4,
}
export declare abstract class BaseFormControlComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    protected changeDetectorRef: ChangeDetectorRef;
    protected validationService: DynamicUIFormValidationService;
    control: FormControl;
    group: FormGroup;
    hasErrorMessaging: boolean;
    model: ComponentModel;
    blur: EventEmitter<BaseFormControlEvent>;
    change: EventEmitter<BaseFormControlEvent>;
    focus: EventEmitter<BaseFormControlEvent>;
    customEvent: EventEmitter<BaseFormControlEvent>;
    private subscriptions;
    constructor(changeDetectorRef: ChangeDetectorRef, validationService: DynamicUIFormValidationService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setupControl(): void;
    readonly errorMessages: string[];
    readonly hasHint: boolean;
    readonly hasList: boolean;
    readonly isInvalid: boolean;
    readonly isValid: boolean;
    readonly showErrorMessages: boolean;
    protected setControlRelations(): void;
    unsubscribe(): void;
    onModelDisabledUpdates(value: boolean): void;
    onFilterChange($event: any | BaseFormControlEvent): void;
    onValueChange($event: Event | BaseFormControlEvent | any): void;
    onBlur($event: FocusEvent | BaseFormControlEvent | any): void;
    onFocus($event: FocusEvent | BaseFormControlEvent | any): void;
    onCustomEvent($event: any, type?: string | null): void;
    protected createEvent($event: any, type: string): BaseFormControlEvent;
}
