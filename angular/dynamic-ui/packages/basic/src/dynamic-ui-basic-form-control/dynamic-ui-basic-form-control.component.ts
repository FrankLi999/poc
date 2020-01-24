import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ChangeDetectorRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
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
  DYNAMIC_UI_COMPONENT_TYPE_EDITOR,
  DYNAMIC_UI_COMPONENT_TYPE_GROUP,
  DYNAMIC_UI_COMPONENT_TYPE_SELECT,
  DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA,
  DYNAMIC_UI_COMPONENT_TYPE_DATETIME,
  DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD,
  DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP,
  DYNAMIC_UI_COMPONENT_TYPE_RATING,
  DYNAMIC_UI_COMPONENT_TYPE_SLIDER,
  DYNAMIC_UI_COMPONENT_TYPE_SWITCH,
  DYNAMIC_UI_COMPONENT_TYPE_TIME,
  Utils
} from "@bpw-ui/base";

export const enum DynamicUIBasicFormControlType {
    Array = 1, //"ARRAY",
    Checkbox = 2, //"CHECKBOX",
    Group = 3, //"GROUP",
    Input = 4, //"INPUT",
    RadioGroup = 5, //"RADIO_GROUP",
    Select = 6, //"SELECT",
    TextArea = 7, //"TEXTAREA"
    Columns = 8 //"Columns"
}

@Component({
    selector: "dynamic-ui-basic-form-control",
    templateUrl: "./dynamic-ui-basic-form-control.component.html"
})
export class DynamicUIBasicFormControlComponent extends BaseFormControlComponent implements OnChanges {

    @Input() componentId: boolean = true;
    @Input() context: ComponentModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: ComponentModel;
    @Input() nestedTemplates: QueryList<ComponentTemplateDirective>;

    @Output() blur: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() change: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();
    @Output() focus: EventEmitter<BaseFormControlEvent> = new EventEmitter<BaseFormControlEvent>();

    @ContentChildren(ComponentTemplateDirective) contentTemplates: QueryList<ComponentTemplateDirective>;

    type: DynamicUIBasicFormControlType | null;

    static getFormControlType(model: ComponentModel): DynamicUIBasicFormControlType | null {

        switch (model.type) {

            case DYNAMIC_UI_COMPONENT_TYPE_DATAGRID:
                return DynamicUIBasicFormControlType.Array;
            case DYNAMIC_UI_COMPONENT_TYPE_COLUMNS:
                return DynamicUIBasicFormControlType.Columns;
            case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX:
                return DynamicUIBasicFormControlType.Checkbox;

            case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_UI_COMPONENT_TYPE_GROUP:
                return DynamicUIBasicFormControlType.Group;

            case DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD:
                return DynamicUIBasicFormControlType.Input;

            case DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP:
                return DynamicUIBasicFormControlType.RadioGroup;

            case DYNAMIC_UI_COMPONENT_TYPE_SELECT:
                return DynamicUIBasicFormControlType.Select;

            case DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA:
                return DynamicUIBasicFormControlType.TextArea;
            case "textfield":
            case "email":
            case "phoneNumber": {
                return DynamicUIBasicFormControlType.Input;
            }
            default:
                return null;
        }
    }

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected validationService: DynamicUIFormValidationService) {
      super(changeDetectorRef, validationService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes["model"]) {
            this.type = DynamicUIBasicFormControlComponent.getFormControlType(this.model);
            console.log(this.type);
        }
    }
}
