import {
    FormioCheckboxModel,
    FormioCheckboxGroupModel,
    FormioDatePickerModel,
    FormioInputModel,
    FormioRadioGroupModel,
    FormioSelectModel,
    FormioSliderModel,
    FormioSwitchModel,
    FormioTextAreaModel
} from "../formio/formio-core";


export const MATERIAL_CONTROL_MODEL = [
    new FormioSelectModel<string>(
        {
            id: "materialSelect",
            //label: "Example Select",
            multiple: true,
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            placeholder: "Select an option"
        }
    ),
    
    new FormioInputModel(
        {
            hint: "Just a hint",
            id: "materialInput",
            list: ["Football", "Basketball", "Baseball", "Hockey"],
            maxLength: 51,
            placeholder: "example input",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),
   
    new FormioDatePickerModel(
        {
            id: "materialDatepicker",
            placeholder: "Material Datepicker",
            value: new Date()
        }
    ),

    new FormioCheckboxGroupModel(
        {
            id: "materialCheckboxGroup",
            group: [
                new FormioCheckboxModel(
                    {
                        id: "materialCheckbox1",
                        label: "Checkbox 1"
                    }
                ),
                new FormioCheckboxModel(
                    {
                        id: "materialCheckbox2",
                        label: "Checkbox 2"
                    }
                )
            ]
        }
    ),

    new FormioSwitchModel(
        {
            id: "materialSwitch",
            offLabel: "Off",
            onLabel: "On",
            value: false
        }
    ),

    new FormioRadioGroupModel<string>(
        {
            id: "materialRadioGroup",
            //label: "Example Option",
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    disabled: true,
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            relation: [
                {
                    action: "DISABLE",
                    when: [
                        {
                            id: "materialSwitch",
                            value: true
                        }
                    ]
                }
            ],
            value: "option-3"
        }
    ),

    new FormioSliderModel(
        {
            id: "materialSlider",
            min: 0,
            max: 10,
            step: 1,
            value: 3,
            vertical: false
        }
    ),

    new FormioTextAreaModel(
        {
            id: "materialTextArea",
            //label: "Example Textarea",
            rows: 1,
            placeholder: "example Textarea",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),

    new FormioCheckboxModel(
        {
            id: "materialCheckbox",
            label: "I do agree"
        }
    )
];

export const MATERIAL_APP_MODEL = {
  componentType: 'ui-article',
  id: 'appForm',
  cssClass: 'FormPage',
  offscreenText: 'Start of form',
  formControl: null,
  ifForm: true,
  components: [
    {
      componentType: 'ui-section-instruction',
      offscreenText: 'Start of form instructions',
      content: 'instruction text'
    },
    {
      componentType: 'ui-section',
      id: 'section id',
      label: 'Section label',
      components: MATERIAL_CONTROL_MODEL
    }
  ]
}