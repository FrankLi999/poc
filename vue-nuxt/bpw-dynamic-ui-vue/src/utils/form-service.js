'use strict'
// import { mergeData } from 'vue-functional-data-merge'
export const formControlOption = { native: true }
const option = formControlOption
export const formComponents = {
  title: { component: 'h1', option },
  description: { component: 'p', option },
  error: { component: 'div', option },
  form: { component: 'form', option },
  file: { component: 'input', option },
  label: { component: 'label', option },
  input: { component: 'input', option },
  radio: { component: 'input', option },
  select: { component: 'select', option },
  option: { component: 'option', option },
  button: {
    component: 'button',
    option: {
      ...option,
      type: 'submit',
      label: 'Submit'
    }
  },
  checkbox: { component: 'input', option },
  textarea: { component: 'textarea', option },
  radiogroup: { component: 'div', option },
  checkboxgroup: { component: 'div', option },
  row: { component: 'div', option },
  column: { component: 'div', option },
  table: { component: 'div', option }
}

export const defaultFormInput = { component: 'input', option }
export const defaultFormGroup = { component: 'div', option }

const ARRAY_KEYWORDS = ['anyOf', 'oneOf', 'enum', 'properties']

export const getFieldName = (parent, name) => {
  return parent ? parent + '.' + name : name
}

const setFormField = (vm, parentName, formModel, fieldAttrs) => {
  if (formModel.name) {
    const fieldName = getFieldName(parentName, formModel.name)
    fieldAttrs.name = fieldName
    fieldAttrs.id = fieldName.replace('.', '_')
    vm.fields[fieldName] = fieldAttrs
    setFormValue(vm, fieldAttrs)
  }
}
const setCommonFields = (formModel, fieldAttrs) => {
  fieldAttrs.value = fieldAttrs.hasOwnProperty('value')
    ? fieldAttrs.value
    : formModel.hasOwnProperty('default') ? formModel.default : ''
  fieldAttrs.dataType = formModel.type
  fieldAttrs.label = formModel.title || ''
  fieldAttrs.description = formModel.description || ''
  fieldAttrs.required = formModel.required || false
  fieldAttrs.disabled = formModel.disabled || false
}

const setFormValue = (vm, fieldAttrs) => {
  if (vm.value && !getValue(vm.value, fieldAttrs.name)) {
    // vm.$set(vm.value, field.name, field.value)
    setValue(vm.value, fieldAttrs.name, fieldAttrs.value)
  }
}

const setFormComponent = (type, component, option = {}) => {
  formComponents[type] = { component, option }
}

export const setupFormComponents = () => {
  setFormComponent('form', 'b-form', ({ vm }) => {
    // vm is the formModel VM

    const labelWidth = '120px'
    const model = vm.data
    const rules = {}

    Object.keys(vm.fields).forEach((fieldName) => {
      const field = vm.fields[fieldName]
      const type = field.dataType === 'array' && field.type === 'radio'
        ? 'string'
        : field.dataType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type)
        ? 'change' : 'blur'

      // http://element.eleme.io/#/en-US/component/form#validation
      rules[field.name] = { type, required, message, trigger }
    })

    // returning the form props
    return { labelWidth, rules, model }
  })

  // http://element.eleme.io/#/en-US/component/form#validation
  setFormComponent('label', 'b-form-group', ({ fieldAttrs }) => ({
    label: fieldAttrs.label,
    'label-for': fieldAttrs.id
  }))

  setFormComponent('email', 'b-form-input')
  setFormComponent('text', 'b-form-input')
  setFormComponent('textarea', 'b-form-input')
  setFormComponent('checkbox', 'b-form-checkbox')
  // formModelBootstrap.setComponent('switch', 'b-form-switch')
  setFormComponent('radio', 'b-form-radio')
  setFormComponent('select', 'b-form-select')

  // You can also use the component object
  // formModelElement.setComponent('option', Option)

  // By default `<h1/>` is used to render the form title.
  // To override this, use the `title` type:
  setFormComponent('title', 'h2')

  // By default `<p/>` is used to render the form title.
  // To override this, use the `description` type:
  setFormComponent('description', 'small')

  // By default `<div/>` is used to render the message error.
  // To override this, use the `error` type:
  setFormComponent('error', 'b-form-invalid-feedback')
  setFormComponent('row', 'b-form-row')
  setFormComponent('column', 'b-col')
  setFormComponent('table', 'b-multi-entry')
}
export const setValue = (object, path, value) => {
  if (!object) { return }
  var keys = Array.isArray(path) ? path : path.split('.')
  for (var i = 0; i < keys.length - 1; i++) {
    var key = keys[i]
    if (!object.hasOwnProperty(key)) {
      object[key] = {}
    }
    object = object[key]
  }
  object[keys[i]] = value
}

export const getMessage = (object, path, $t) => {
  var messageKeys = getValue(object, path)
  var messages = ''
  if (messageKeys) {
    messageKeys.forEach((key, index) => {
      if (index > 0) {
        messages += ','
      }
      let msg = $t(key.key)
      msg = (msg === key.key) ? $t(key.fallbackKey) : msg
      msg = (msg === key.fallbackKey) ? key.key : msg
      messages += msg
    })
  }
  return messages
}

export const getValue = (object, path) => {
  var keys = Array.isArray(path) ? path : path.split('.')
  // keys.forEach(p => { object = object[p] })
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!object || !object.hasOwnProperty(key)) {
      object = undefined
      break
    }
    object = object[key]
  }
  return object
}

export const loadFields = (vm, parentName, formModel) => {
  if (!formModel || formModel.visible === false) {
    return
  }
  switch (formModel.type) {
    case 'object':
      let fieldAttrs = formModel.attrs || {}
      fieldAttrs.dataType = formModel.type
      fieldAttrs.entries = []
      for (let key in formModel.properties) {
        formModel.properties[key].name = key
        if (formModel.required) {
          for (let field of formModel.required) {
            if (formModel.properties[field]) {
              formModel.properties[field].required = true
            }
          }
        }
        fieldAttrs.entries.push(key)
        loadFields(vm, getFieldName(parentName, formModel.name ? formModel.name : null), formModel.properties[key])
      }
      setFormField(vm, parentName, formModel, fieldAttrs)
      break

    case 'boolean':
      loadBooleanField(vm, parentName, formModel)
      break

    case 'array':
      loadArrayFields(vm, parentName, formModel)
      break

    case 'integer':
    case 'number':
    case 'string':
      for (let keyword of ARRAY_KEYWORDS) {
        if (formModel.hasOwnProperty(keyword)) {
          formModel.items = {
            type: formModel.type,
            enum: formModel[keyword]
          }
          loadArrayFields(vm, parentName, formModel)
          return
        }
      }
      loadStringField(vm, parentName, formModel)
      break
  }
}

export const loadBooleanField = (vm, parentName, formModel) => {
  let fieldAttrs = formModel.attrs || {}

  setCommonFields(formModel, fieldAttrs)

  if (!fieldAttrs.type) {
    fieldAttrs.type = 'checkbox'
  }

  // fieldAttrs.checked = formModel.checked || false
  setFormField(vm, parentName, formModel, fieldAttrs)
  return fieldAttrs
}

export const loadStringField = (vm, parentName, formModel) => {
  let fieldAttrs = formModel.attrs || {}
  if (!fieldAttrs.type) {
    switch (formModel.type) {
      case 'number':
      case 'integer':
        fieldAttrs.type = 'number'
        break
      default:
        fieldAttrs.type = formModel.textarea ? null : 'text'
    }
  }

  if (formModel.format) {
    switch (formModel.format) {
      case 'email':
        if (!fieldAttrs.type) {
          fieldAttrs.type = 'email'
        }
        break
      case 'uri':
        if (!fieldAttrs.type) {
          fieldAttrs.type = 'url'
        }
        break
      case 'regex':
        if (!fieldAttrs.type) {
          fieldAttrs.type = 'text'
        }

        fieldAttrs.pattern = formModel.format
        break
    }
  }

  setCommonFields(formModel, fieldAttrs)

  setFormField(vm, parentName, formModel, fieldAttrs)

  if (formModel.minLength) {
    fieldAttrs.minlength = formModel.minLength
  }

  if (formModel.maxLength) {
    fieldAttrs.maxlength = formModel.maxLength
  }

  return fieldAttrs
}

export const resolveItems = (items) => {
  return items.map((item) => {
    if (typeof item !== 'object') {
      return { value: item, label: item }
    }

    return item
  })
}

export const loadArrayFields = (vm, parentName, formModel) => {
  let fieldAttrs = formModel.attrs || {}

  setCommonFields(formModel, fieldAttrs)

  fieldAttrs.multiple = formModel.minItems > 1
  // fieldAttrs.items = []

  for (let keyword of ARRAY_KEYWORDS) {
    if (formModel.hasOwnProperty(keyword)) {
      switch (keyword) {
        case 'enum':
          if (!fieldAttrs.type) {
            fieldAttrs.type = 'select'
          }
          fieldAttrs.value = fieldAttrs.value || ''
          fieldAttrs.items = resolveItems(formModel[keyword])
          break

        case 'oneOf':
          fieldAttrs.type = 'radio'
          fieldAttrs.value = fieldAttrs.value || ''
          fieldAttrs.items = resolveItems(formModel[keyword])
          break
        case 'anyOf':
          fieldAttrs.type = 'checkbox'
          fieldAttrs.value = fieldAttrs.value || []
          fieldAttrs.items = resolveItems(formModel[keyword])
          break
        case 'properties':
          // formModel.attrs = fieldAttrs
          fieldAttrs.type = 'properties'
          fieldAttrs.multiple = true
          fieldAttrs.value = fieldAttrs.value || []
          fieldAttrs.entries = []
          for (let key in formModel.properties) {
            formModel.properties[key].name = key
            if (formModel.required) {
              for (let field of formModel.required) {
                if (formModel.properties[field]) {
                  formModel.properties[field].required = true
                }
              }
            }
            fieldAttrs.entries.push(key)
            loadFields(vm, getFieldName(parentName, formModel.name ? formModel.name : null), formModel.properties[key])
          }
          break
      }
    }
  }
  setFormField(vm, parentName, formModel, fieldAttrs)
  return fieldAttrs
}
