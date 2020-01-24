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

export abstract class FormioBaseComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    
    bindId: boolean;
    context: FormioFormArrayGroupModel| ComponentModel | null;
    // control: FormControl;
    // group: FormGroup;
    hasFocus: boolean;
    model: FormioFormControlModel | ComponentModel;
    nestedTemplates: QueryList<FormioTemplateDirective> | null = null;

    contentTemplates: QueryList<FormioTemplateDirective>;
    template: FormioTemplateDirective;

    abstract type: number | string | null;

    constructor(
        // protected changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        let groupChange = changes["group"] as SimpleChange,
            modelChange = changes["model"] as SimpleChange;
        if (groupChange || modelChange) {
            this.setupControl();
        }
    }

    ngOnInit(): void {
        if (!Utils.isDefined(this.model)) {
            throw new Error(`no [model] input set for FormioFormControlComponent`);
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.setTemplates(), 0); // setTimeout to trigger change detection
        //this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
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
            if (template.as === null && (template.modelType === this.model.type || template.modelId === this.getModelId())) {
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
