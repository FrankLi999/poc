import {
    FormioCheckboxModel,
    FormioCheckboxGroupModel,
    FormioDatePickerModel,
    FormioEditorModel,
    FormioInputModel,
    FormioRadioGroupModel,
    FormioRatingModel,
    FormioSelectModel,
    FormioSliderModel,
    FormioSwitchModel,
    FormioTextAreaModel,
    FormioTimePickerModel
} from "../formio/formio-core";

export const PRIMENG_EXAMPLE_MODEL = [

    new FormioSelectModel<string>(
        {
            id: "primeSelect",
            label: "Prime Select",
            multiple: false,
            filterable: true,
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
                }
            ],
            value: "option-3"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioDatePickerModel(
        {
            id: "primeDatepicker",
            format: "mm/dd/yy",
            inline: false,
            label: "Prime Datepicker"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioInputModel(
        {
            id: "primeInput",
            label: "Prime Input",
            list: ["One", "Two", "Three", "Four", "Five"],
            maxLength: 51,
            multiple: true,
            placeholder: "Prime input",
            validators: {
                required: null
            },
            errorMessages: {
                required: "{{label}} is required"
            }
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-4",
                errors: "ui-grid-col-5",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioEditorModel(
        {
            id: "primeEditor",
            value: "Prime Editor"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    ),

    new FormioCheckboxGroupModel(
        {
            id: "primeCheckboxGroup",
            legend: "Prime Checkbox Group",
            group: [
                new FormioCheckboxModel(
                    {
                        id: "primeCheckboxGroup1",
                        label: "Checkbox 1"
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            container: "ui-grid-row"
                        }
                    }
                ),
                new FormioCheckboxModel(
                    {
                        id: "primeCheckboxGroup2",
                        label: "Checkbox 2",
                        value: true
                    },
                    {
                        element: {
                            label: "ui-widget"
                        },
                        grid: {
                            container: "ui-grid-row"
                        }
                    }
                )
            ]
        }
    ),

    new FormioTimePickerModel(
        {
            id: "primeTimePicker",
            label: "Prime Timepicker",
            showSeconds: true
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioRadioGroupModel<string>(
        {
            id: "primeRadioGroup",
            legend: "Prime Radio Group",
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
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    ),

    new FormioSwitchModel(
        {
            id: "primeSwitch",
            label: "Prime Switch",
            offLabel: "Off",
            onLabel: "On",
            value: false
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioTextAreaModel(
        {
            id: "primeTextArea",
            label: "Prime Textarea",
            rows: 5,
            placeholder: "Prime Textarea",
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioSliderModel(
        {
            id: "primeSlider",
            label: "Prime Slider",
            min: 0,
            max: 10,
            step: 1,
            value: 3
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioRatingModel(
        {
            id: "primeRating",
            label: "Prime Rating",
            value: 3
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row",
                control: "ui-grid-col-9",
                label: "ui-grid-col-3"
            }
        }
    ),

    new FormioCheckboxModel(
        {
            id: "primeCheckbox",
            label: "I do agree"
        },
        {
            element: {
                label: "ui-widget"
            },
            grid: {
                container: "ui-grid-row"
            }
        }
    )
];