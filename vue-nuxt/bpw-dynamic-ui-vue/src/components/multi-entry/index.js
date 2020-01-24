import bMultiEntry from './multi-entry'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bMultiEntry
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
