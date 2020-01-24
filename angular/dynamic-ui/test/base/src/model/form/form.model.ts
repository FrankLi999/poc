import { ComponentModel } from './component.model';

export const DYNAMIC_UI_COMPONENT_TYPE_CONTENT = 'content';
export const DYNAMIC_UI_COMPONENT_TYPE_HTMLELEMENT = 'htmlelement';
export const DYNAMIC_UI_COMPONENT_TYPE_BUTTON = 'button';
export const DYNAMIC_UI_COMPONENT_TYPE_IMAGE = 'image';

export const DYNAMIC_UI_COMPONENT_TYPE_FORM = 'form';
export const DYNAMIC_UI_COMPONENT_TYPE_GROUP = 'group';
export const DYNAMIC_UI_COMPONENT_TYPE_DATAGRID = 'datagrid';

export const DYNAMIC_UI_COMPONENT_TYPE_WIZARD = 'wizard';
export const DYNAMIC_UI_COMPONENT_TYPE_COLUMNS = 'columns';

export const DYNAMIC_UI_COMPONENT_TYPE_CONTAINER = 'container';
export const DYNAMIC_UI_COMPONENT_TYPE_TABLE = 'table';
export const DYNAMIC_UI_COMPONENT_TYPE_WELL = 'well';
export const DYNAMIC_UI_COMPONENT_TYPE_PANEL = 'panel';
export const DYNAMIC_UI_COMPONENT_TYPE_FIELDSET = 'fieldset';

export const DYNAMIC_UI_COMPONENT_TYPE_ADDRESS = 'address';

export const DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD = 'textfield';
export const DYNAMIC_UI_COMPONENT_TYPE_NUMBER = 'number';
export const DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX = 'checkbox';
export const DYNAMIC_UI_COMPONENT_TYPE_EMAIL = 'email';
export const DYNAMIC_UI_COMPONENT_TYPE_PHONENUMBER = 'phoneNumber';
export const DYNAMIC_UI_COMPONENT_TYPE_SUERVEY = 'survey';
export const DYNAMIC_UI_COMPONENT_TYPE_SIGNATURE = 'signature';
export const DYNAMIC_UI_COMPONENT_TYPE_PASSWORD = 'password';
export const DYNAMIC_UI_COMPONENT_TYPE_DAY = 'day';
export const DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA = 'textarea';
export const DYNAMIC_UI_COMPONENT_TYPE_RADIO = 'radio';
export const DYNAMIC_UI_COMPONENT_TYPE_CURRENCY = 'currency';
export const DYNAMIC_UI_COMPONENT_TYPE_SELECT = 'select';
export const DYNAMIC_UI_COMPONENT_TYPE_SELECTBOXES = 'selectboxes';
export const DYNAMIC_UI_COMPONENT_TYPE_DATETIME = 'datetime';
export const DYNAMIC_UI_COMPONENT_TYPE_TIME = 'time';
export const DYNAMIC_UI_COMPONENT_TYPE_HIDDEN = 'hidden';
export const DYNAMIC_UI_COMPONENT_TYPE_FILE = 'file';
export const DYNAMIC_UI_COMPONENT_TYPE_RESOURCE = 'resource';
export const DYNAMIC_UI_COMPONENT_TYPE_CUSTOM = 'custom';

export const DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP = 'checkbox_group';
export const DYNAMIC_UI_COMPONENT_TYPE_EDITOR = 'editor';
export const DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP = 'radio_group';
export const DYNAMIC_UI_COMPONENT_TYPE_RATING = 'rating';
export const DYNAMIC_UI_COMPONENT_TYPE_SLIDER = 'slider';
export const DYNAMIC_UI_COMPONENT_TYPE_SWITCH = 'switch';

export interface FormModel {
  title?: string;
  /**
   * Wizard, Pdf or Form
   */
  display?: string;
  name?: string;
  path?: string;
  project?: string;
  template?: string;
  page?: number;
  numPages?: number;

  components?: Array<ComponentModel>;
}
