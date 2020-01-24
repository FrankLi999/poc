import { ComponentModel } from './component.model';
export declare const DYNAMIC_UI_COMPONENT_TYPE_CONTENT = "content";
export declare const DYNAMIC_UI_COMPONENT_TYPE_HTMLELEMENT = "htmlelement";
export declare const DYNAMIC_UI_COMPONENT_TYPE_BUTTON = "button";
export declare const DYNAMIC_UI_COMPONENT_TYPE_IMAGE = "image";
export declare const DYNAMIC_UI_COMPONENT_TYPE_FORM = "form";
export declare const DYNAMIC_UI_COMPONENT_TYPE_GROUP = "group";
export declare const DYNAMIC_UI_COMPONENT_TYPE_DATAGRID = "datagrid";
export declare const DYNAMIC_UI_COMPONENT_TYPE_WIZARD = "wizard";
export declare const DYNAMIC_UI_COMPONENT_TYPE_COLUMNS = "columns";
export declare const DYNAMIC_UI_COMPONENT_TYPE_CONTAINER = "container";
export declare const DYNAMIC_UI_COMPONENT_TYPE_TABLE = "table";
export declare const DYNAMIC_UI_COMPONENT_TYPE_WELL = "well";
export declare const DYNAMIC_UI_COMPONENT_TYPE_PANEL = "panel";
export declare const DYNAMIC_UI_COMPONENT_TYPE_FIELDSET = "fieldset";
export declare const DYNAMIC_UI_COMPONENT_TYPE_ADDRESS = "address";
export declare const DYNAMIC_UI_COMPONENT_TYPE_TEXTFIELD = "textfield";
export declare const DYNAMIC_UI_COMPONENT_TYPE_NUMBER = "number";
export declare const DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX = "checkbox";
export declare const DYNAMIC_UI_COMPONENT_TYPE_EMAIL = "email";
export declare const DYNAMIC_UI_COMPONENT_TYPE_PHONENUMBER = "phoneNumber";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SUERVEY = "survey";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SIGNATURE = "signature";
export declare const DYNAMIC_UI_COMPONENT_TYPE_PASSWORD = "password";
export declare const DYNAMIC_UI_COMPONENT_TYPE_DAY = "day";
export declare const DYNAMIC_UI_COMPONENT_TYPE_TEXTAREA = "textarea";
export declare const DYNAMIC_UI_COMPONENT_TYPE_RADIO = "radio";
export declare const DYNAMIC_UI_COMPONENT_TYPE_CURRENCY = "currency";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SELECT = "select";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SELECTBOXES = "selectboxes";
export declare const DYNAMIC_UI_COMPONENT_TYPE_DATETIME = "datetime";
export declare const DYNAMIC_UI_COMPONENT_TYPE_TIME = "time";
export declare const DYNAMIC_UI_COMPONENT_TYPE_HIDDEN = "hidden";
export declare const DYNAMIC_UI_COMPONENT_TYPE_FILE = "file";
export declare const DYNAMIC_UI_COMPONENT_TYPE_RESOURCE = "resource";
export declare const DYNAMIC_UI_COMPONENT_TYPE_CUSTOM = "custom";
export declare const DYNAMIC_UI_COMPONENT_TYPE_CHECKBOX_GROUP = "checkbox_group";
export declare const DYNAMIC_UI_COMPONENT_TYPE_EDITOR = "editor";
export declare const DYNAMIC_UI_COMPONENT_TYPE_RADIO_GROUP = "radio_group";
export declare const DYNAMIC_UI_COMPONENT_TYPE_RATING = "rating";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SLIDER = "slider";
export declare const DYNAMIC_UI_COMPONENT_TYPE_SWITCH = "switch";
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
