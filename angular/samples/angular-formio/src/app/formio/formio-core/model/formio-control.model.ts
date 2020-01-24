export class FormioControls {
   
  static readonly ComponentType = {
    Container: 'ui-container',
    Input: 'ui-input',
    Radio: 'ui-radio',
    Checkbox: 'ui-checkbox',
    Instruction: 'ui-instruction',
    Note: 'ui-note',
    Html: 'ui-html',
    Help: 'ui-help',

    DialogBusyWait: 'ui-dialog-busywait',
    DialogCancel: 'ui-dialog-cancel',
    DialogHelp: 'ui-dialog-help',

    Section: 'ui-section',
    SectionInstruction: 'ui-section-instruction',
    SectionNavigation: 'ui-section-navigation',
    SectionConsent: 'ui-section-consent',

    Article: 'ui-article'
  };

    private static articleSupport = {
        "Html": FormioControls.ComponentType.Html,
        "Instruction": FormioControls.ComponentType.Instruction,
        "Section": FormioControls.ComponentType.Section,
        "SectionInstruction": FormioControls.ComponentType.SectionInstruction,
        "SectionNavigation": FormioControls.ComponentType.SectionNavigation,
    };
    private static containerSupport = {
         "Container" : FormioControls.ComponentType.Container,
         "Instruction": FormioControls.ComponentType.Instruction,
         "Note": FormioControls.ComponentType.Note,
         "Html": FormioControls.ComponentType.Html,
         "Help": FormioControls.ComponentType.Help,
         "Input": FormioControls.ComponentType.Input,
         "Radio": FormioControls.ComponentType.Radio,
         "Checkbox": FormioControls.ComponentType.Checkbox
    };
    public static support = {
        "article": FormioControls.articleSupport,
        "container": FormioControls.articleSupport
    };
}
export interface UIPathable {

    id?: string;
    index?: number;
    parent: UIPathable;
}

export interface UIControl extends UIPathable {
    name?: string;
    title?: string;
}

export interface UIInputControl extends UIControl {
    value?: string;
    label?: string;
}
