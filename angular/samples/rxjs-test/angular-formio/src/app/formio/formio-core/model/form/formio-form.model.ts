import { ComponentModel } from './formio-component.model';

export const FORMIO_COMPONENT_TYPE_CONTENT = 'content';
export const FORMIO_COMPONENT_TYPE_HTMLELEMENT = 'htmlelement';
export const FORMIO_COMPONENT_TYPE_BUTTON = 'button';
export const FORMIO_COMPONENT_TYPE_IMAGE = 'image';

export const FORMIO_COMPONENT_TYPE_FORM = 'form';
export const FORMIO_COMPONENT_TYPE_GROUP = 'group';
export const FORMIO_COMPONENT_TYPE_DATAGRID = 'datagrid';

export const FORMIO_COMPONENT_TYPE_WIZARD = 'wizard';
export const FORMIO_COMPONENT_TYPE_COLUMNS = 'columns';

export const FORMIO_COMPONENT_TYPE_CONTAINER = 'container';
export const FORMIO_COMPONENT_TYPE_TABLE = 'table';
export const FORMIO_COMPONENT_TYPE_WELL = 'well';
export const FORMIO_COMPONENT_TYPE_PANEL = 'panel';
export const FORMIO_COMPONENT_TYPE_FIELDSET = 'fieldset';

export const FORMIO_COMPONENT_TYPE_ADDRESS = 'address'

export const FORMIO_COMPONENT_TYPE_TEXTFIELD = 'textfield';
export const FORMIO_COMPONENT_TYPE_NUMBER = 'number';
export const FORMIO_COMPONENT_TYPE_CHECKBOX = 'checkbox';
export const FORMIO_COMPONENT_TYPE_EMAIL = 'email';
export const FORMIO_COMPONENT_TYPE_PHONENUMBER = 'phoneNumber';
export const FORMIO_COMPONENT_TYPE_SUERVEY = 'survey'
export const FORMIO_COMPONENT_TYPE_SIGNATURE = 'signature';
export const FORMIO_COMPONENT_TYPE_PASSWORD = 'password';
export const FORMIO_COMPONENT_TYPE_DAY = 'day';
export const FORMIO_COMPONENT_TYPE_TEXTAREA = 'textarea';
export const FORMIO_COMPONENT_TYPE_RADIO = 'radio';
export const FORMIO_COMPONENT_TYPE_CURRENCY = 'currency';
export const FORMIO_COMPONENT_TYPE_SELECT = 'select';
export const FORMIO_COMPONENT_TYPE_SELECTBOXES = 'selectboxes';
export const FORMIO_COMPONENT_TYPE_DATETIME = 'datetime';
export const FORMIO_COMPONENT_TYPE_TIME = 'time';
export const FORMIO_COMPONENT_TYPE_HIDDEN = 'hidden';
export const FORMIO_COMPONENT_TYPE_FILE = 'file';
export const FORMIO_COMPONENT_TYPE_RESOURCE = 'resource';
export const FORMIO_COMPONENT_TYPE_CUSTOM = 'custom';

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