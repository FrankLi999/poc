import {FormModel, ComponentModel} from '@bpw-ui/base';

export const EXAMPLE_FORM_MODEL: FormModel = {
  "title": "Example",
  "display": "form",
  "name": "example",
  "path": "example",
  "project": "5692b91fd1028f01000407e3",
  // "type": "form",
  "components": [
    {
      "conditional": {
        "eq": "",
        "when": null,
        "show": ""
      },
      "type": "content",
      "html": "<h1><a href=\"https://form.io\">Form.io</a> Example Form</h1>\n\n<p>This is a dynamically rendered JSON form&nbsp;built with <a href=\"https://form.io\">Form.io</a>. Using a simple&nbsp;drag-and-drop form builder, you can create any form that includes e-signatures, wysiwyg editors, date fields, layout components, data grids, surveys, etc.</p>\n",
      "input": false
    },
    {
      label: 'Children',
      key: 'children',
      type: 'datagrid',
      fxLayout:'row',
      numRows: 3,
      input: false,
      components: [
          {
          fxFlex: '75%',
            label: 'First Name',
          key: 'firstName',
          type: 'textfield',
          placeholder: 'Enter your first name',
          input: true
          },
          {
          fxFlex: '75%',
          label: 'Last Name',
          key: 'lastName',
          type: 'textfield',
          placeholder: 'Enter your last name',
          input: true
          },
          {
          fxFlex: '70%',
          label: 'Gender',
          key: 'gender',
          type: 'textfield',
          placeholder: 'Enter your gender',
          input: true
        },
         {
          fxFlex: '60%',
          type: 'textfield',
          label: 'Dependant',
          key: 'dependant',
          placeholder: 'Enter your dependant',
          input: true
          },
         {
          fxFlex: '75%',
          label: 'Birthdate',
          key: 'birthdate',
          type: 'textfield',
          placeholder: 'Enter your birthdate',
          input: true
        }
      ]
    },
    {
      "type": "group",
      "key": "contact",
      "input": false,
      "components": [{
        "conditional": {
          "eq": "",
          "when": null,
          "show": ""
        },
        "type": "columns",
        "fxLayout":"row",
        "columns": [
          {
            "fxFlex": '50',
            "fxLayout": "row",
            "components": [
              {
                "type": "textfield",
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "fxFlex": "85%",
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your first name",
                "key": "firstName",
                "label": "First Name",
                "inputMask": "",
                "inputType": "text",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "1"
              },
              {
                "type": "textfield",
                "fxFlex": "85%",
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your last name",
                "key": "lastName",
                "label": "Last Name",
                "inputMask": "",
                "inputType": "text",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "1"
              }
            ]
          },
          {
            "fxFlex": '50',
            "fxLayout": "column",
            "components": [
              {
                "kickbox": {
                  "enabled": false
                },
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "fxFlex": "85%",
                "type": "email",
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your email address",
                "key": "email",
                "label": "Email",
                "inputType": "email",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "3"
              },
              {
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "type": "phoneNumber",
                "fxFlex": "85%",
                "validate": {
                  "required": null
                },
                "defaultValue": "",
                "persistent": true,
                "unique": false,
                "protected": false,
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your phone number",
                "key": "phoneNumber",
                "label": "Phone Number",
                "inputMask": "(999) 999-9999",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "4"
              }
            ]
          }
        ],
        "input": false
      }],
    },
    {
      "type": "group",
      "key": "contact1",
      "input": false,
      "components": [{
        "conditional": {
          "eq": "",
          "when": null,
          "show": ""
        },
        "type": "columns",
        "fxLayout":"row",
        "columns": [
          {
            "fxLayout": "row",
            "components": [
              {
                "type": "textfield",
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "fxFlex": "85%",
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your first name",
                "key": "firstName",
                "label": "First Name",
                "inputMask": "",
                "inputType": "text",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "1"
              },
              {
                "type": "textfield",
                "fxFlex": "85%",
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your last name",
                "key": "lastName",
                "label": "Last Name",
                "inputMask": "",
                "inputType": "text",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "1"
              },
              {
                "kickbox": {
                  "enabled": false
                },
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "validate": {
                  "customPrivate": false,
                  "custom": "",
                  //"pattern": "",
                  //"maxLength": "",
                  //"minLength": "",
                  "required": null
                },
                "fxFlex": "85%",
                "type": "email",
                "persistent": true,
                "unique": false,
                "protected": false,
                "defaultValue": "",
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your email address",
                "key": "email",
                "label": "Email",
                "inputType": "email",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "3"
              },
              {
                "conditional": {
                  "eq": "",
                  "when": null,
                  "show": ""
                },
                "type": "phoneNumber",
                "fxFlex": "85%",
                "validate": {
                  "required": null
                },
                "defaultValue": "",
                "persistent": true,
                "unique": false,
                "protected": false,
                "multiple": false,
                "suffix": "",
                "prefix": "",
                "placeholder": "Enter your phone number",
                "key": "phoneNumber",
                "label": "Phone Number",
                "inputMask": "(999) 999-9999",
                "tableView": true,
                "input": true,
                "hidden": false,
                "clearOnHide": true,
                "tags": [],
                "tabindex": "4"
              }
            ]
          }
        ],
        "input": false
      }],
    }
    /*,
    {
      "conditional": {
        "eq": "",
        "when": null,
        "show": ""
      },
      "type": "survey",
      "validate": {
        "customPrivate": false,
        "custom": "",
        "required": true
      },
      "persistent": true,
      "protected": false,
      "defaultValue": "",
      "values": [
        {
          "label": "Excellent",
          "value": "excellent"
        },
        {
          "label": "Great",
          "value": "great"
        },
        {
          "label": "Good",
          "value": "good"
        },
        {
          "label": "Average",
          "value": "average"
        },
        {
          "label": "Poor",
          "value": "poor"
        }
      ],
      "questions": [
        {
          "label": "How would you rate the Form.io platform?",
          "value": "howWouldYouRateTheFormIoPlatform"
        },
        {
          "label": "How was Customer Support?",
          "value": "howWasCustomerSupport"
        },
        {
          "label": "Overall Experience?",
          "value": "overallExperience"
        }
      ],
      "key": "survey",
      "label": "Survey",
      "tableView": true,
      "input": true,
      "hidden": false,
      "clearOnHide": true,
      "tags": [],
      "tabindex": "5"
    },
    {
      "conditional": {
        "eq": "",
        "when": null,
        "show": ""
      },
      "hideLabel": true,
      "type": "signature",
      "validate": {
        "required": true
      },
      "persistent": true,
      "protected": false,
      "maxWidth": "2.5",
      "minWidth": "0.5",
      "backgroundColor": "rgb(245,245,235)",
      "penColor": "black",
      "height": "150px",
      "width": "100%",
      "footer": "Sign above",
      "placeholder": "",
      "key": "signature",
      "label": "Signature",
      "tableView": true,
      "input": true,
      "hidden": false,
      "clearOnHide": true,
      "tags": []
    },
    {
      "type": "button",
      "theme": "primary",
      "disableOnInvalid": true,
      "action": "submit",
      "block": false,
      "rightIcon": "",
      "leftIcon": "",
      "size": "md",
      "key": "submit",
      "tableView": false,
      "label": "Submit",
      "input": true,
      "tags": [],
      "conditional": {
        "show": "",
        "when": null,
        "eq": ""
      },
      "tabindex": "6"
    }
    */
  ]
}
