import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ChangeDetectorRef
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
    DynamicUIFormValidationService,
    BaseFormControlComponent,
    BaseFormControlEvent,
    ComponentTemplateDirective,
    ComponentModel,
    DYNAMIC_UI_COMPONENT_TYPE_DATAGRID,
    DYNAMIC_UI_COMPONENT_TYPE_COLUMNS,
    DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX,
    DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP,
    DYNAMIC_UI_COMPONENT_TYPE_DATETIME,
    DYNAMIC_UI_COMPONENT_TYPE_GROUP,
    DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD,
    DYNAMIC_UI_COMPONENT_TYPE_EDITOR,
    DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP,
    DYNAMIC_UI_COMPONENT_TYPE_SELECT,
    DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA,
    DYNAMIC_UI_COMPONENT_TYPE_SLIDER,
    DYNAMIC_UI_COMPONENT_TYPE_SWITCH
} from "@bpw-ui/base";
import {
    MatFormControlType, MAT_VIEW_CHILD_SELECTOR
} from "../dynamic-ui-material-form.const";

export type MatFormControlComponent = MatAutocomplete | MatCheckbox | MatDatepicker<Date> | MatFormField |
    MatRadioGroup | MatSelect | MatSlider | MatSlideToggle;

@Component({
    selector: "dynamic-ui-material-form-control",
    templateUrl: "./dynamic-ui-material-form-control.component.html"
})
export class DynamicUIMaterialFormControlComponent extends BaseFormControlComponent implements OnChanges {

    private _showCharacterCount: boolean = false;

    @Input() componentId: boolean = true;
    @Input() context: ComponentModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as ComponentModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;

    @ViewChild(MAT_VIEW_CHILD_SELECTOR) matViewChild: MatFormControlComponent | undefined;

    type: MatFormControlType | null;

    static getFormControlType(model: ComponentModel): MatFormControlType | null {

        switch (model.type) {

            case DYNAMIC_UI_COMPONENT_TYPE_DATAGRID:
                return MatFormControlType.Array;
            case DYNAMIC_UI_COMPONENT_TYPE_COLUMNS:
                return MatFormControlType.Columns;
            case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX:
                return MatFormControlType.Checkbox;
            case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_UI_COMPONENT_TYPE_GROUP:
                return MatFormControlType.Group;
            case DYNAMIC_UI_COMPONENT_TYPE_DATETIME:
                return MatFormControlType.DatePicker;
            case DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD:
                return MatFormControlType.Input;
            case DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP:
                return MatFormControlType.RadioGroup;
            case DYNAMIC_UI_COMPONENT_TYPE_SELECT:
                return MatFormControlType.Select;
            case DYNAMIC_UI_COMPONENT_TYPE_SLIDER:
                return MatFormControlType.Slider;
            case DYNAMIC_UI_COMPONENT_TYPE_SWITCH:
                return MatFormControlType.SlideToggle;
            case DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA:
                return MatFormControlType.TextArea;
            default:
                return null;
        }
    }
    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, validationService);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes["model"]) {
            this.type = DynamicUIMaterialFormControlComponent.getFormControlType(this.model);
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
