// import { mergeData } from 'vue-functional-data-merge'
import {validationMixin} from '@bpw/validate-vue'
import {
  loadFields,
  getValue,
  setValue,
  getMessage,
  getFieldName,
  setupFormComponents,
  formControlOption,
  formComponents,
  defaultFormGroup,
  defaultFormInput
} from '../../utils/form-service'

const option = formControlOption
export default {
  name: 'b-form-bootstrap',
  mixins: [
    validationMixin
  ],
  props: {
    /**
      * The JSON formModel object. Use the `v-if` directive to load asynchronous formModel.
      */
    formModel: { type: Object, required: true },

    /**
      * Use this directive to create two-way data bindings with the component. It automatically picks the correct way to update the element based on the input type.
      * @model
      * @default {}
      */
    value: { type: Object, default: () => ({}) },

    /**
      * This property indicates whether the value of the control can be automatically completed by the browser. Possible values are: `off` and `on`.
      */
    autocomplete: { type: String },

    /**
      * This Boolean attribute indicates that the form is not to be validated when submitted.
      */
    novalidate: { type: Boolean },

    /**
      * Define the inputs wrapping class. Leave `undefined` to disable input wrapping.
      */
    inputWrappingClass: { type: String }
  },
  data: () => ({
    default: {},
    fields: {},
    data: {},
    layout: {}
  }),
  created () {
    setupFormComponents()
    // this.formModel = JSON.parse(JSON.stringify(this.formModel))
    loadFields(this, null, this.formModel)
    this.default = { ...this.value } // mergeData({}, this.value)
    this.data = { ...this.value } // mergeData({}, this.value)
    this.layout = this.formModel.layout
  },
  render (createElement) {
    const nodes = []
    if (this.formModel.title) {
      nodes.push(createElement(
        formComponents.title.component, this.formModel.title))
    }

    if (this.formModel.description) {
      nodes.push(createElement(
        formComponents.description.component, this.formModel.description))
    }
    const rowNodes = []
    if (this.layout.rows && this.layout.rows.length) {
      this.layout.rows.forEach((row) => {
        const columnNodes = []
        row.columns.forEach((column) => {
          switch (column.componentType) {
            case 'input':
              this.renderInputField(column, createElement, columnNodes)
              break
            case 'table':
              this.renderTable(column, createElement, columnNodes)
              break
          }
        })
        rowNodes.push(createElement(formComponents.row.component, {}, columnNodes))
      })
      const button = this.$slots.hasOwnProperty('default')
        ? { component: this.$slots.default, option }
        : formComponents.button
      if (button.component instanceof Array) {
        rowNodes.push(createElement(
          formComponents.row.component, {}, button.component))
      } else {
        const buttonOptions = this.elementOptions(button)
        const buttonElement = createElement(button.component, buttonOptions, button.option.label)

        rowNodes.push(createElement(
          formComponents.row.component, {}, [buttonElement]))
      }

      const formOptions = this.elementOptions(formComponents.form, {
        autocomplete: this.autocomplete,
        novalidate: this.novalidate
      })
      nodes.push(createElement(formComponents.form.component, {
        ref: '__form',
        on: {
          submit: (event) => {
            event.stopPropagation()
            this.submit(event)
          },
          invalid: this.invalid
        },
        ...formOptions
      }, rowNodes))
    }
    return createElement('div', nodes)
  },
  mounted () {
    this.reset()
  },
  methods: {
    /**
      * @private
      */
    renderInputField (column, createElement, columnNodes) {
      const fieldAttr = this.fields[column.fieldName]
      if (!fieldAttr.value) {
        fieldAttr.value = getValue(this.data, fieldAttr.name)
      }
      fieldAttr.state = !getValue(this.$v.data, fieldAttr.name + '.$invalid')
      fieldAttr.message = getMessage(this.$v.data, fieldAttr.name + '.$messages', this.$t)
      // If field.type is null, it is textarea
      const element = fieldAttr.hasOwnProperty('items') && fieldAttr.type !== 'select'
        ? formComponents[`${fieldAttr.type}group`] || defaultFormGroup
        : formComponents[fieldAttr.type ? fieldAttr.type : 'textarea'] || defaultFormInput

      const fieldOptions = this.elementOptions(element, fieldAttr, fieldAttr)
      const children = []
      const ariaDescby = fieldAttr.id + '_feedback'
      const input = {
        ref: fieldAttr.name,
        attrs: {
          'aria-describedby': ariaDescby
        },
        domProps: {
          value: getValue(this.data, fieldAttr.name)
        },
        on: {
          input: (event) => {
            const value = event && event.target ? event.target.value : event
            setValue(this.data, fieldAttr.name, value)
            // Fired synchronously when the value of an element is changed.
            this.$emit('input', this.data)
          },
          change: this.changed
        },
        ...fieldOptions
      }
      delete fieldAttr.value
      switch (fieldAttr.type) {
        case 'textarea':
          if (element.option.native) {
            input.domProps.innerHTML = getValue(this.value, fieldAttr.name)
          }
          break

        case 'radio':
          this.handleItems(fieldAttr, createElement, children)
          break
        case 'checkbox':
          this.handleItems(fieldAttr, createElement, children)
          // input.domProps.checked = fieldAttr.value === getValue(this.value, fieldAttr.name)
          break

        case 'select':
          children.push(createElement(formComponents.option.component, {
            domProps: {
              value: null,
              text: fieldAttr.placeholder,
              disabled: fieldAttr.required
            }}))
          fieldAttr.items.forEach((option) => {
            const optionOptions = this.elementOptions(formComponents.option, {
              value: option.value
            }, fieldAttr)
            children.push(createElement(formComponents.option.component, {
              domProps: {
                value: option.value
              },
              ...optionOptions
            }, option.label))
          })
          break
      }
      const inputElement = createElement(element.component, input, children)
      const formControlsNodes = []
      const labelOptions = this.elementOptions(formComponents.label, fieldAttr, fieldAttr)
      const labelNodes = []
      if (formComponents.label.option.native) {
        labelNodes.push(createElement('span', {
          attrs: {
            'data-required-field': fieldAttr.required ? 'true' : 'false'
          }
        }, fieldAttr.label))
      }
      labelNodes.push(inputElement)
      labelNodes.push(createElement(
        formComponents.error.component, {
          attrs: {
            'id': ariaDescby
          }
        }, fieldAttr.message))
      formControlsNodes.push(createElement(
        formComponents.label.component, labelOptions, labelNodes))
      const columnOptions = this.elementOptions(column)
      if (this.inputWrappingClass) {
        columnNodes.push(
          createElement(formComponents.column.component, columnOptions,
            createElement('div', {
              class: this.inputWrappingClass
            },
            formControlsNodes)))
      } else {
        columnNodes.push(createElement(formComponents.column.component, columnOptions, formControlsNodes))
      }
    },

    /**
      * @private
      */
    renderTable (column, createElement, columnNodes) {
      const fieldAttr = this.fields[column.fieldName]
      fieldAttr.value = getValue(this.value, fieldAttr.name)
      fieldAttr.entryModel = fieldAttr
      fieldAttr.layout = column
      fieldAttr.fields = this.fields
      fieldAttr.$v = this.$v
      const element = formComponents['table']
      const fieldOptions = this.elementOptions(element, fieldAttr, fieldAttr)
      const children = []
      const input = {
        ref: fieldAttr.name,
        on: {
          newEntry: (event) => {
            let newEntry = {}
            this.createNewEntry(newEntry, event)
            getValue(this.data, event).push(newEntry)
          },
          removeEntry: (event) => {
            getValue(this.data, event.name).splice(event.index, 1)
          }
        },
        ...fieldOptions
      }
      delete fieldAttr.value
      const tableNode = createElement(element.component, input, children)

      const tableNodes = []
      tableNodes.push(tableNode)
      const columnOptions = this.elementOptions(column)
      if (this.inputWrappingClass) {
        columnNodes.push(
          createElement(formComponents.column.component, columnOptions,
            createElement('div', {
              class: this.inputWrappingClass
            },
            tableNodes)))
      } else {
        columnNodes.push(createElement(formComponents.column.component, columnOptions, tableNodes))
      }
    },

    /**
      * @private
      */
    optionValue (fieldAttrs, target, item = {}) {
      return typeof target === 'function'
        ? target({ vm: this, fieldAttrs, item })
        : target
    },

    /**
      * @private
      */
    elementOptions (element, extendingOptions = {}, fieldAttrs = {}, item = {}) {
      const attrName = element.option.native ? 'attrs' : 'props'
      const elementProps = typeof element.option === 'function'
        ? element.option
        : { ...element.option, native: undefined }
      // : mergeData(element.option, { native: undefined })
      const options = this.optionValue(fieldAttrs, elementProps, item)
      return { [attrName]: { ...extendingOptions, ...options } }
      // return { [attrName]: mergeData(extendingOptions, options) }
    },

    /**
      * @private
      */
    createNewEntry (newEntry, entryName) {
      const fieldAttrs = this.fields[entryName]
      fieldAttrs.entries.forEach(key => {
        const fieldName = getFieldName(entryName, key)
        const entryAttrs = this.fields[fieldName]
        switch (entryAttrs.dataType) {
          case 'object':
            newEntry[key] = {}
            this.createNewEntry(newEntry[key], fieldName)
            break
          case 'array':
            // TODO - not supported
            break
          default:
            newEntry[key] = entryAttrs.value
            break
        }
      })
      return newEntry
    },

    /**
      * @private
      */
    changed (e) {
      /**
        * Fired when a change to the element's value is committed by the user.
        */
      this.$emit('change', e)
    },

    /**
      * @private
      */
    handleItems (fieldAttr, createElement, children) {
      if (fieldAttr.hasOwnProperty('items')) {
        fieldAttr.items.forEach((item) => {
          const itemOptions = this.elementOptions(
            formComponents[fieldAttr.type], item, item, item)
          children.push(createElement(
            formComponents[fieldAttr.type].component, itemOptions, item.label))
        })
      }
    },

    /**
      * Get a form input reference
      */
    input (name) {
      if (!this.$refs[name]) {
        throw new Error(`Undefined input reference '${name}'`)
      }
      return this.$refs[name][0]
    },

    /**
      * Get the form reference
      */
    form () {
      return this.$refs.__form
    },

    /**
      * Checks whether the form has any constraints and whether it satisfies them. If the form fails its constraints, the browser fires a cancelable `invalid` event at the element, and then returns false.
      */
    checkValidity () {
      return this.$refs.__form.checkValidity()
    },

    /**
      * @private
      */
    invalid (e) {
      /**
        * Fired when a submittable element has been checked and doesn't satisfy its constraints. The validity of submittable elements is checked before submitting their owner form, or after the `checkValidity()` of the element or its owner form is called.
        */
      this.$emit('invalid', e)
    },

    /**
      * Reset the value of all elements of the parent form.
      */
    reset () {
      for (let key in this.default) {
        this.$set(this.data, key, this.default[key])
      }
    },

    /**
      * Send the content of the form to the server
      */
    submit (event) {
      if (this.checkValidity()) {
        /**
          * Fired when a form is submitted
          */
        this.$emit('submit', event)
      }
    }
  }
}
