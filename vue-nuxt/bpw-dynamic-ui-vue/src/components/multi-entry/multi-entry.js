// import { mergeData } from 'vue-functional-data-merge'
import {
  getValue,
  setValue,
  getMessage,
  formComponents,
  defaultFormGroup,
  defaultFormInput
} from '../../utils/form-service'
// const option = formControlOption
export default {
  name: 'b-multi-entry',
  props: {
    /**
      * The JSON formModel object. Use the `v-if` directive to load asynchronous formModel.
      */
    entryModel: { type: Object, required: true },

    /**
      * The JSON formModel object. Use the `v-if` directive to load asynchronous formModel.
      */
    fields: { type: Object, required: true },

    /**
      * The JSON formModel object. Use the `v-if` directive to load asynchronous formModel.
      */
    layout: { type: Object, required: true },

    /**
      * Use this directive to create two-way data bindings with the component. It automatically picks the correct way to update the element based on the input type.
      * @model
      * @default {}
      */
    value: { type: Array, default: () => ({}) },

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
    inputWrappingClass: { type: String },
    $v: { type: Object, required: true }
  },
  data: () => ({
    data: {}
  }),
  created () {
    this.data = this.value
  },
  render (createElement) {
    const nodes = []
    if (this.entryModel.label) {
      nodes.push(createElement(
        formComponents.title.component, this.entryModel.label))
    }
    if (this.entryModel.description) {
      nodes.push(createElement(
        formComponents.description.component, this.entryModel.description))
    }
    this.data.forEach((entry, index) => {
      const entryColumnNodes = []
      if (this.layout.rows && this.layout.rows.length) {
        const dataRows = []
        this.layout.rows.forEach((row) => {
          const columnNodes = []
          row.columns.forEach((column) => {
            this.renderInputField(column, createElement, columnNodes, entry, index)
          })
          dataRows.push(createElement(formComponents.row.component, {}, columnNodes))
        })
        entryColumnNodes.push(createElement(formComponents.column.component, {
          props: {
            cols: '10'
          }
        }, dataRows))
        const removeEntryButton = formComponents.button
        const removeEntryButtonOptionsLabel = createElement('i', {
          attrs: {
            class: 'fas fa-times-circle'
          }
        })
        const removeEntryButtonOptions = this.elementOptions(removeEntryButton, {
          type: 'button'
          // label: '<i class="fal fa-times-circle"></i>'
        })
        const removeEntryButtonElement = createElement(removeEntryButton.component, {
          on: {
            click: (event) => {
              event.stopPropagation()
              this.$emit('removeEntry', {name: this.entryModel.name, index: index})
            }
          },
          ...removeEntryButtonOptions
        }, [removeEntryButtonOptionsLabel])
        entryColumnNodes.push(createElement(formComponents.column.component, {
          props: {
            cols: '2'
          }
        }, [removeEntryButtonElement]))
      }
      nodes.push(createElement(formComponents.row.component, {}, entryColumnNodes))
    })
    const newEntryButton = formComponents.button
    const newEntryButtonOptions = this.elementOptions(newEntryButton, {
      type: 'button',
      label: 'New entry'
    })
    const newEntryButtonElement = createElement(newEntryButton.component, {
      ref: '__multi_entry',
      on: {
        click: (event) => {
          event.stopPropagation()
          this.$emit('newEntry', this.entryModel.name)
        }
      },
      ...newEntryButtonOptions
    }, newEntryButtonOptions.attrs.label)
    nodes.push(createElement(formComponents.row.component, {}, [newEntryButtonElement]))
    return createElement('div', nodes)
  },
  mounted () {
    // Todo
  },
  methods: {
    /**
      * @private
      */
    renderInputField (column, createElement, columnNodes, entry, index) {
      const fieldAttr = this.fields[column.fieldName]
      const entryFieldName = column.fieldName.substring(this.entryModel.name.length + 1)
      if (!fieldAttr.value) {
        fieldAttr.value = getValue(entry, entryFieldName)
      }
      fieldAttr.state = !getValue(getValue(this.$v.data, this.entryModel.name).$each[index], entryFieldName + '.$invalid')
      fieldAttr.message = getMessage(getValue(this.$v.data, this.entryModel.name).$each[index], entryFieldName + '.$messages', this.$t)
      const element = fieldAttr.hasOwnProperty('items') && fieldAttr.type !== 'select'
        ? formComponents[`${fieldAttr.type}group`] || defaultFormGroup
        : formComponents[fieldAttr.type ? fieldAttr.type : 'textarea'] || defaultFormInput
      const fieldOptions = this.elementOptions(element, fieldAttr, fieldAttr)
      const children = []
      const ariaDescby = fieldAttr.id + '_feedback_' + index
      const input = {
        ref: fieldAttr.name,
        attrs: {
          'aria-describedby': ariaDescby
        },
        domProps: {
          value: getValue(entry, entryFieldName)
        },
        on: {
          input: (event) => {
            const value = event && event.target ? event.target.value : event
            setValue(entry, entryFieldName, value)
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
          input.domProps.checked = fieldAttr.value === getValue(this.value, fieldAttr.name)
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
      return { [attrName]: { ...options, ...extendingOptions } }
      // return { [attrName]: mergeData(options, extendingOptions) }
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
    }
  }
}
