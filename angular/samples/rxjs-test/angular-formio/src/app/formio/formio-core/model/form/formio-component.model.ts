import {ConditionModel} from './formio-condition.model';
import { ValidationModel } from './formio-validation.model';
import { AttributeModel } from './formio-attribute.model';
import { LabelModel } from './formio-label.model';
import { DatePickerModel } from './formio-date-picker.model';
import { TimePickerModel } from './formio-time-picker.model';
import { SelectDataModel } from './formio-select-data.model';
import { DayModel } from './formio-day.model';

export interface ComponentModel {
  defaultValue?: any;
  type?: string;
  key?: string;
  label?: string;
  input?: boolean;
  required?: boolean;
  multiple?: boolean;
  protected?: boolean;
  unique?: boolean;
  persistent?: boolean;
  tableView?: boolean;
  lockKey?: boolean;
  
 
  conditional?: ConditionModel;
  customConditional?: string;

  customClass?: string;
  tabindex?: string;
  inputType?: string;


  // input
  tree?: boolean;
  inputMask?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;

  // text area
  rows?: number;
    
  // survey
  questions?: Array<LabelModel>;

  // button
  size?: string;
  leftIcon?: string;
  rightIcon?: string;
  block?: boolean;
  action?: string;
  disableOnInvalid?: boolean;
  theme?: string;

  // content
  html?: string;

  // image, file: url, s3, dropbox
  storage?: any;

  // HTML Element
  attrs?: Array<AttributeModel>;
  tag?: string;
  className?: string;

  // Radio, Select
  values?: Array<LabelModel>;
  data?: SelectDataModel;  
  dataSrc?: string;
  valueProperty?: string;
  refreshOn?: string;
  filter?: string;
  authenticate?: boolean;
  template?: string;

  // signature
  maxWidth?: string;
  minWidth?: string;
  backgroundColor?: string;
  penColor?: string;
  height?: string;
  width?: string;
  footer?: string;
  clearOnHide?: boolean;
  tags?: string[];
  hideLabel?: boolean;


  // date, time
  format?: string;
  enableDate?: boolean;
  enableTime?: boolean;
  datepickerMode?: string;
  datePicker?: DatePickerModel;
  timePicker?: TimePickerModel;
  minDate?: string;
  maxDate?: string;
  defaultDate?: string;
  // day
  fields?: DayModel;
  dayFirst?: boolean;

  //number
  increment?: string; //or step
  // address

  //Resource
  searchFields?: Array<string>;
  selectFields?: Array<string>;
  defaultValues?: Array<any>;
  resource?: string;
  project?: string;

  // panel -> wizard page
  title?: string;
  isNew?: boolean;
  
  // data grid
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  condensed?: boolean;
  addAnotherText?: string;

  //table
  numRows?: number;
  numCols?: number;

  //rows: any;// -> refer to kitchen-form.json line 411.
  header?: any;
  caption?: string;

  // Field Set
  legend?: string;
  components?: Array<ComponentModel>;

  //email
  kickbox?: any;
  
  validate?: ValidationModel;
  asyncValidate?: ValidationModel;
  disabled?: boolean;
  errorMessages?:  {[errorCode: string]: string } ;
  columns?: Array<ComponentModel>;
  hidden?: boolean;
  //dynamic forms
  relation?: Array<any>;
  disabledUpdates?: any;
  hasErrorMessages?: boolean;

  //columns
  fxLayout?: string;

  //column
  fxFlex?: string;
}
  