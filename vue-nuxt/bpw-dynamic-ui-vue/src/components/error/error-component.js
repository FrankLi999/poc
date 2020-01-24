export default {
  name: 'b-error',
  inject: ['$v'],
  functional: true,
  props: {
    for: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  render (createElement, { props, injections }) {
    return createElement(props.tag, injections.$v.errors.first(props.for))
  }
}
