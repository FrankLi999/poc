import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    MatAutocomplete,
    MatCheckbox,
    MatDatepicker,
    MatFormField,
    MatRadioGroup,
    MatSelect,
    MatSlider,
    MatSlideToggle
} from "@angular/material";
import {
    FormioNg2DynamicFormValidationService,
    FormioFormControlComponent,
    FormioFormControlModel,
    FormioFormArrayGroupModel,
    FormioFormControlEvent,
    FormioTemplateDirective,
    FormioInputModel,
    FORMIO_FORM_CONTROL_TYPE_ARRAY,
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX,
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    FORMIO_FORM_CONTROL_TYPE_DATEPICKER,
    FORMIO_FORM_CONTROL_TYPE_GROUP,
    FORMIO_FORM_CONTROL_TYPE_INPUT,
    FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP,
    FORMIO_FORM_CONTROL_TYPE_SELECT,
    FORMIO_FORM_CONTROL_TYPE_SLIDER,
    FORMIO_FORM_CONTROL_TYPE_SWITCH,
    FORMIO_FORM_CONTROL_TYPE_TEXTAREA
} from "../formio-core";
import { MatFormControlType, MAT_VIEW_CHILD_SELECTOR } from "./formio-material-form.const";

export type MatFormControlComponent = MatAutocomplete | MatCheckbox | MatDatepicker<Date> | MatFormField |
    MatRadioGroup | MatSelect | MatSlider | MatSlideToggle;

@Component({

    moduleId: module.id,
    selector: "formio-material-form-control",
    templateUrl: "./formio-material-form-control.component.html"
})
export class FormioMaterialFormControlComponent extends FormioFormControlComponent implements OnChanges {

    private _showCharacterCount: boolean = false;

    @Input() bindId: boolean = true;
    @Input() context: FormioFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: FormioFormControlModel;
    @Input() nestedTemplates: QueryList<FormioTemplateDirective>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as FormioInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;

    @ViewChild(MAT_VIEW_CHILD_SELECTOR) matViewChild: MatFormControlComponent | undefined;

    type: MatFormControlType | null;

    static getFormControlType(model: FormioFormControlModel): MatFormControlType | null {

        switch (model.type) {

            case FORMIO_FORM_CONTROL_TYPE_ARRAY:
                return MatFormControlType.Array;

            case FORMIO_FORM_CONTROL_TYPE_CHECKBOX:
                return MatFormControlType.Checkbox;

            case FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case FORMIO_FORM_CONTROL_TYPE_GROUP:
                return MatFormControlType.Group;

            case FORMIO_FORM_CONTROL_TYPE_DATEPICKER:
                return MatFormControlType.DatePicker;

            case FORMIO_FORM_CONTROL_TYPE_INPUT:
                return MatFormControlType.Input;

            case FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MatFormControlType.RadioGroup;

            case FORMIO_FORM_CONTROL_TYPE_SELECT:
                return MatFormControlType.Select;

            case FORMIO_FORM_CONTROL_TYPE_SLIDER:
                return MatFormControlType.Slider;

            case FORMIO_FORM_CONTROL_TYPE_SWITCH:
                return MatFormControlType.SlideToggle;

            case FORMIO_FORM_CONTROL_TYPE_TEXTAREA:
                return MatFormControlType.TextArea;

            default:
                return null;
        }
    }
    constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = FormioMaterialFormControlComponent.getFormControlType(this.model);
        }
    }

    get characterCount(): number | null {

        if (this.matViewChild instanceof MatFormField) {
            //return (this.matViewChild as MatFormField)._matInputChild.value.length;
            return (this.matViewChild as MatFormField)._control.value.length;
        } else {
            return null;
        }
    }

    
}