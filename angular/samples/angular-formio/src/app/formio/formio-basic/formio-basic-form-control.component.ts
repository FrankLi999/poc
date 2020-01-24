import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    FormioNg2DynamicFormValidationService,
    FormioFormControlModel,
    FormioFormArrayGroupModel,
    FormioFormControlComponent,
    FormioFormControlEvent,
    FormioTemplateDirective,
    FORMIO_FORM_CONTROL_TYPE_ARRAY,
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX,
    FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    FORMIO_FORM_CONTROL_TYPE_GROUP,
    FORMIO_FORM_CONTROL_TYPE_INPUT,
    FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP,
    FORMIO_FORM_CONTROL_TYPE_SELECT,
    FORMIO_FORM_CONTROL_TYPE_TEXTAREA
} from "../formio-core";

export const enum FormioBasicFormControlType {
    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    Group = 3, //"GROUP",
    Input = 4, //"INPUT",
    RadioGroup = 5, //"RADIO_GROUP",
    Select = 6, //"SELECT",
    TextArea = 7, //"TEXTAREA"
}

@Component({
    moduleId: module.id,
    selector: "formio-basic-form-control",
    templateUrl: "./formio-basic-form-control.component.html"
})
export class FormioBasicFormControlComponent extends FormioFormControlComponent implements OnChanges {

    @Input() bindId: boolean = true;
    @Input() context: FormioFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: FormioFormControlModel;
    @Input() nestedTemplates: QueryList<FormioTemplateDirective>;

    @Output() blur: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() change: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();
    @Output() focus: EventEmitter<FormioFormControlEvent> = new EventEmitter<FormioFormControlEvent>();

    @ContentChildren(FormioTemplateDirective) contentTemplates: QueryList<FormioTemplateDirective>;

    type: FormioBasicFormControlType | null;

    static getFormControlType(model: FormioFormControlModel): FormioBasicFormControlType | null {

        switch (model.type) {

            case FORMIO_FORM_CONTROL_TYPE_ARRAY:
                return FormioBasicFormControlType.Array;

            case FORMIO_FORM_CONTROL_TYPE_CHECKBOX:
                return FormioBasicFormControlType.Checkbox;

            case FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case FORMIO_FORM_CONTROL_TYPE_GROUP:
                return FormioBasicFormControlType.Group;

            case FORMIO_FORM_CONTROL_TYPE_INPUT:
                return FormioBasicFormControlType.Input;

            case FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP:
                return FormioBasicFormControlType.RadioGroup;

            case FORMIO_FORM_CONTROL_TYPE_SELECT:
                return FormioBasicFormControlType.Select;

            case FORMIO_FORM_CONTROL_TYPE_TEXTAREA:
                return FormioBasicFormControlType.TextArea;
            case "textfield":
            case "email":
            case "phoneNumber": {
                return FormioBasicFormControlType.Input;
            }
            default:
                return null;
        }
    }

    constructor(protected validationService: FormioNg2DynamicFormValidationService) {
        super(validationService);
    }
    
    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes["model"]) {
            console.log(">>>>>>>>>>>>>>> 1");
            this.type = FormioBasicFormControlComponent.getFormControlType(this.model);
            console.log(this.type);
        }
    }
}
