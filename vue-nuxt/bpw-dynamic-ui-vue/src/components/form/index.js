import bFormBootstrap from './form-bootstrap'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  bFormBootstrap
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
