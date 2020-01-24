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
import {
  PrimeNGFormControlType,
  PRIME_NG_VIEW_CHILD_SELECTOR,
  PRIME_NG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
  PRIME_NG_CHIPS_TEMPLATE_DIRECTIVES,
  PRIME_NG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES
} from "../dynamic-ui-primeng-form.const";

export type PrimengFormControlType = AutoComplete | Calendar | Checkbox | Chips | Dropdown | Editor | InputSwitch |
  MultiSelect | Rating | Slider;

@Component({
  selector: "dynamic-ui-primeng-form-control",
  templateUrl: "./dynamic-ui-primeng-form-control.component.html"
})
export class DynamicUIPrimengFormControlComponent extends BaseFormControlComponent implements OnChanges {

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

  @ViewChild(PRIME_NG_VIEW_CHILD_SELECTOR) pViewChild: PrimengFormControlType | undefined;

  suggestions: string[];
  type: PrimeNGFormControlType | null;

  static getFormControlType(model: ComponentModel): PrimeNGFormControlType | null {

    switch (model.type) {

      case DYNAMIC_UI_COMPONENT_TYPE_DATAGRID:
        return PrimeNGFormControlType.Array;
      case DYNAMIC_UI_COMPONENT_TYPE_COLUMNS:
        return PrimeNGFormControlType.Columns;
      case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX:
        return PrimeNGFormControlType.Checkbox;
      case DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP:
      case DYNAMIC_UI_COMPONENT_TYPE_GROUP:
        return PrimeNGFormControlType.Group;
      case DYNAMIC_UI_COMPONENT_TYPE_DATETIME:
      case DYNAMIC_UI_COMPONENT_TYPE_TIME:
        return PrimeNGFormControlType.Calendar;
      case DYNAMIC_UI_COMPONENT_TYPE_EDITOR:
        return PrimeNGFormControlType.Editor;
      case DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD:
        const inputModel = model as ComponentModel;
        if (inputModel.list) {
          return PrimeNGFormControlType.AutoComplete;
        } else if (inputModel.multiple) {
          return PrimeNGFormControlType.Chips;
        } else {
          return PrimeNGFormControlType.Input;
        }
      case DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP:
        return PrimeNGFormControlType.RadioGroup;
      case DYNAMIC_UI_COMPONENT_TYPE_RATING:
        return PrimeNGFormControlType.Rating;
      case DYNAMIC_UI_COMPONENT_TYPE_SELECT:
        return model.multiple ? PrimeNGFormControlType.MultiSelect : PrimeNGFormControlType.Dropdown;
      case DYNAMIC_UI_COMPONENT_TYPE_SLIDER:
        return PrimeNGFormControlType.Slider;
      case DYNAMIC_UI_COMPONENT_TYPE_SWITCH:
        return PrimeNGFormControlType.InputSwitch;
      case DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA:
        return PrimeNGFormControlType.TextArea;
      default:
        return null;
    }
  }

  static getTemplateDirectives(component: PrimengFormControlType): any | null {

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

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected validationService: DynamicUIFormValidationService) {
    super(changeDetectorRef, validationService);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes["model"]) {
      this.type = DynamicUIPrimengFormControlComponent.getFormControlType(this.model);
    }
  }

  protected setTemplateDirective(directive: ComponentTemplateDirective): void {
    if (this.pViewChild) {

      let templateDirectives: any = DynamicUIPrimengFormControlComponent.getTemplateDirectives(this.pViewChild);

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
    this.suggestions = this.model.list.map(item => item);
  }
}
