import {
    FormioCheckboxModel,
    FormioCheckboxGroupModel,
    FormioInputModel,
    FormioRadioGroupModel,
    FormioSelectModel,
    FormioTextAreaModel,
    FormioFormArrayModel,
    FormioFormGroupModel
} from "../formio/formio-core";
import { customValidator } from "../app.validators";

export const BASIC_EXAMPLE_MODEL = [

    new FormioSelectModel<string>({

        id: "basicSelect",
        label: "Example Select",
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
            }
        ],
        value: "option-1"
    }),

    new FormioInputModel({

        id: "basicInput",
        hint: "Just a hint",
        label: "Example Input",
        list: ["One", "Two", "Three", "Four", "Five"],
        //mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        maxLength: 51,
        placeholder: "example input",
        spellCheck: false,
        required: false,
        validators: {
            required: null,
            minLength: 2,
            maxLength: 5,
            customValidator: {
                name: customValidator.name,
                args: null
            }
        },
        errorMessages: {
            required: "{{label}} is required",
            customValidator: "{{label}} cannot start with abc"
        }
    }),

    new FormioCheckboxGroupModel({

        id: "basicCheckboxGroup",
        legend: "Example Checkbox Group",
        group: [
            new FormioCheckboxModel(
                {
                    id: "checkboxGroup1",
                    label: "Checkbox 1"
                }
            ),
            new FormioCheckboxModel(
                {
                    id: "checkboxGroup2",
                    label: "Checkbox 2"
                }
            )
        ]
    }),

    new FormioRadioGroupModel<string>({

        id: "basicRadioGroup",
        legend: "Example Radio Group",
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
        value: "option-3"
    }),

    new FormioTextAreaModel({

        id: "basicTextArea",
        label: "Example Textarea",
        rows: 5,
        placeholder: "example Textarea"
    }),

    new FormioFormGroupModel({

        id: "basicFormGroup1",
        legend: "Nested Form Group 1",
        group: [
            new FormioInputModel(
                {
                    id: "basicGroupInput1-1",
                    label: "Example Group Input 1-1",
                    value: "Test 1-1"
                }
            ),
            new FormioInputModel(
                {
                    id: "basicGroupInput1-2",
                    label: "Example Group Input 1-2",
                    value: "Test 1-2"
                }
            )]
    }),

    new FormioFormGroupModel({

        id: "basicFormGroup2",
        legend: "Nested Form Group 2",
        group: [
            new FormioInputModel(
                {
                    id: "basicGroupInput2-1",
                    label: "Example Group Input 2-1",
                    value: "Test 2-1"
                }
            ),
            new FormioInputModel(
                {
                    id: "basicGroupInput2-2",
                    label: "Example Group Input 2-2",
                    value: "Test 2-2"
                }
            )]
    }),

    new FormioCheckboxModel({

        id: "basicCheckbox",
        label: "I do agree"
    })
];

export const BASIC_EXAMPLE_ARRAY_MODEL = [

    new FormioFormArrayModel(
        {
            id: "basicFormArray",
            initialCount: 2,
            label: "Example Array Model",
            groupFactory: () => {
                return [
                    new FormioCheckboxModel({

                        label: "Mon",
                        id: "monday"
                    }),
                    new FormioCheckboxModel({

                        label: "Tue",
                        id: "tuesday"
                    }),
                    new FormioCheckboxModel({

                        label: "Wen",
                        id: "wednesday"
                    }),
                    new FormioCheckboxModel({

                        label: "Thu",
                        id: "thursday"
                    }),
                    new FormioCheckboxModel({

                        label: "Fri",
                        id: "friday"
                    }),
                    new FormioCheckboxModel({

                        label: "Sat",
                        id: "saturday"
                    }),
                    new FormioCheckboxModel({

                        label: "Sun",
                        id: "sunday"
                    })
                ];
            }
        })
];