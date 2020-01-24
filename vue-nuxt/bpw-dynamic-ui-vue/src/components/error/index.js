import bErrorComponent from './error-component'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bErrorComponent
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
