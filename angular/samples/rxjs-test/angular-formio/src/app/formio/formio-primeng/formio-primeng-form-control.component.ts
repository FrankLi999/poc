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
import {FormGroup} from "@angular/forms";
import {
  AutoComplete,
  Calendar,
  Checkbox,
  Chips,
  Dropdown,
  Editor,
  InputSwitch,
  MultiSelect,
  Rating,
  Slider
} from "primeng/primeng";
import {
  FormioNg2DynamicFormValidationService,
  FormioFormControlComponent,
  FormioFormControlModel,
  FormioFormArrayGroupModel,
  FormioFormControlEvent,
  FormioTemplateDirective,
  FormioInputModel,
  FormioSelectModel,
  FORMIO_FORM_CONTROL_TYPE_ARRAY,
  FORMIO_FORM_CONTROL_TYPE_CHECKBOX,
  FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  FORMIO_FORM_CONTROL_TYPE_EDITOR,
  FORMIO_FORM_CONTROL_TYPE_DATEPICKER,
  FORMIO_FORM_CONTROL_TYPE_GROUP,
  FORMIO_FORM_CONTROL_TYPE_INPUT,
  FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP,
  FORMIO_FORM_CONTROL_TYPE_RATING,
  FORMIO_FORM_CONTROL_TYPE_SELECT,
  FORMIO_FORM_CONTROL_TYPE_SLIDER,
  FORMIO_FORM_CONTROL_TYPE_SWITCH,
  FORMIO_FORM_CONTROL_TYPE_TEXTAREA,
  FORMIO_FORM_CONTROL_TYPE_TIMEPICKER,
  Utils
} from "../formio-core";
import {
  PrimeNGFormControlType,
  PRIME_NG_VIEW_CHILD_SELECTOR,
  PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
  PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
  PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES
} from "./formio-primeng-form.const";

export type FormioPrimengFormControlType = AutoComplete | Calendar | Checkbox | Chips | Dropdown | Editor | InputSwitch |
  MultiSelect | Rating | Slider;

@Component({

  moduleId: module.id,
  selector: "formio-primeng-form-control",
  templateUrl: "./formio-primeng-form-control.component.html"
})
export class FormioPrimengFormControlComponent extends FormioFormControlComponent implements OnChanges {

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

  @ViewChild(PRIME_NG_VIEW_CHILD_SELECTOR) pViewChild: FormioPrimengFormControlType | undefined;

  suggestions: string[];
  type: PrimeNGFormControlType | null;

  static getFormControlType(model: FormioFormControlModel): PrimeNGFormControlType | null {

    switch (model.type) {

      case FORMIO_FORM_CONTROL_TYPE_ARRAY:
        return PrimeNGFormControlType.Array;

      case FORMIO_FORM_CONTROL_TYPE_CHECKBOX:
        return PrimeNGFormControlType.Checkbox;

      case FORMIO_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
      case FORMIO_FORM_CONTROL_TYPE_GROUP:
        return PrimeNGFormControlType.Group;

      case FORMIO_FORM_CONTROL_TYPE_DATEPICKER:
      case FORMIO_FORM_CONTROL_TYPE_TIMEPICKER:
        return PrimeNGFormControlType.Calendar;

      case FORMIO_FORM_CONTROL_TYPE_EDITOR:
        return PrimeNGFormControlType.Editor;

      case FORMIO_FORM_CONTROL_TYPE_INPUT:
        const inputModel = model as FormioInputModel;

        if (inputModel.list) {
          return PrimeNGFormControlType.AutoComplete;

        } else if (inputModel.multiple) {
          return PrimeNGFormControlType.Chips;

        } else {
          return PrimeNGFormControlType.Input;
        }

      case FORMIO_FORM_CONTROL_TYPE_RADIO_GROUP:
        return PrimeNGFormControlType.RadioGroup;

      case FORMIO_FORM_CONTROL_TYPE_RATING:
        return PrimeNGFormControlType.Rating;

      case FORMIO_FORM_CONTROL_TYPE_SELECT:
        let selectModel = model as FormioSelectModel<any>;

        return selectModel.multiple ? PrimeNGFormControlType.MultiSelect : PrimeNGFormControlType.Dropdown;

      case FORMIO_FORM_CONTROL_TYPE_SLIDER:
        return PrimeNGFormControlType.Slider;

      case FORMIO_FORM_CONTROL_TYPE_SWITCH:
        return PrimeNGFormControlType.InputSwitch;

      case FORMIO_FORM_CONTROL_TYPE_TEXTAREA:
        return PrimeNGFormControlType.TextArea;

      default:
        return null;
    }
  }

  static getTemplateDirectives(component: FormioPrimengFormControlType): any | null {

    switch (component.constructor) {

      case AutoComplete:
        return PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;

      case Chips:
        return PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES;

      case Dropdown:
        return PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;

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
      this.type = FormioPrimengFormControlComponent.getFormControlType(this.model);
    }
  }

  protected setTemplateDirective(directive: FormioTemplateDirective): void {
    if (this.pViewChild) {

      let templateDirectives: any = FormioPrimengFormControlComponent.getTemplateDirectives(this.pViewChild);

      Object.keys(templateDirectives || {}).forEach((key: string) => {

        if (templateDirectives[key] === directive.as) {
          (this.pViewChild as any)[key] = directive.templateRef;
        }
      });
    }
  }

  setTemplates(): void {
    super.setTemplates();
    this.templates
      .filter(directive => Utils.isString(directive.as))
      .forEach(directive => this.setTemplateDirective(directive));
  }

  onAutoComplete($event: any): void {
    this.suggestions = (this.model as FormioInputModel).list.map(item => item);
  }
}