import {withParamsWeb} from './params'
import {withParamsBrowser} from './withParamsBrowser'
/* istanbul ignore next */
const withParams = process.env.BUILD === 'web'
  ? withParamsWeb
  : withParamsBrowser

export default withParams
