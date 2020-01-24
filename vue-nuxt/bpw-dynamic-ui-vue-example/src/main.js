// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import BootstrapVue from 'bootstrap-vue'
import BootstrapVue from '@bpw/bootstrap-vue'
import BootstrapDynamicUI from '@bpw/dynamic-ui-vue'
import i18next from 'i18next'
import VueI18Next from '@bpw/i18next-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@bpw/bootstrap-vue/dist/bpw-bootstrap-vue.min.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapDynamicUI)
Vue.use(VueI18Next)

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  // Error tracking services Sentry and Bugsnag provide official
  // integrations using this option.
  // https://sentry.io/for/vue/
  // https://docs.bugsnag.com/platforms/browsers/vue/
  console.log(' Vuejs error handler')
  console.log(err)
  console.log(vm)
  console.log(info)
}

Vue.config.warnHandler = function (msg, vm, trace) {
  console.log(' Vuejs warn handler')
  console.log(msg)
  console.log(vm)
  console.log(trace)
}

const locales = {
  en: {
    message: {
      hello: 'Hello!! - EN'
    },
    tos: 'Term of Service',
    term: 'I accept {{1}} {{0}}.',
    loadbundle: 'Load Bundle {{lang}}',
    data: {
      error: 'There are form input errors',
      name: {
        firstName: {
          minLength: 'First name should have at least two characters'
        }
      },
      jobDescription: {
        minLength: 'Job description should have at least two characters'
      },
      addresses: {
        address: {
          street: {
            minLength: 'Street address should have at least two characters'
          },
          town: {
            minLength: 'Town field should have at least two characters'
          },
          zip: {
            minLength: 'Zip code should have at least two characters'
          }
        }
      }
    },
    error: {
      required: 'Field value is required'
    }
  },

  de: {
    message: {
      hello: 'Hallo!! - DE'
    },
    tos: 'Nutzungsbedingungen',
    term: 'Ich akzeptiere {{0}}. {{1}}',
    loadbundle: 'Bundle Laden {{lang}}',
    data: {
      error: 'There are form input errors - DE',
      name: {
        firstName: {
          minLength: 'First name should have at least two characters - DE'
        }
      },
      jobDescription: {
        minLength: 'Job description should have at least two characters - DE'
      },
      addresses: {
        address: {
          street: {
            minLength: 'Street address should have at least two characters - DE'
          },
          town: {
            minLength: 'Town field should have at least two characters - DE'
          },
          zip: {
            minLength: 'Zip code should have at least two characters - DE'
          }
        }
      }
    },
    error: {
      required: 'Field value is required - DE'
    }
  }
}

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: locales.en }
  }
})

const i18n = new VueI18Next(i18next)

Vue.component('language-changer', {
  template: `
    <div>
      <a v-on:click="changeLanguage('de')">DE</a>
      &nbsp;|&nbsp;
      <a v-on:click="changeLanguage('en')">EN</a>
    </div>`,
  methods: {
    changeLanguage (lang) {
      this.$i18n.i18next.changeLanguage(lang)
    }
  }
})

Vue.component('load-bundle', {
  template: `
    <div>
      <a v-on:click="loadBundle">{{$t("loadbundle", {lang: this.lang}) }}</a>
    </div>`,
  data () {
    return {
      lang: 'DE'
    }
  },
  methods: {
    loadBundle () {
      this.$i18n.i18next.addResourceBundle('de', 'translation', locales.de)
    }
  }
})

Vue.component('key-prefix', {
  i18nOptions: {
    keyPrefix: 'message'
  },
  template: `
    <div>
      <p>{{$t('hello')}}</p>
    </div>`
})

Vue.component('inline-translations', {
  i18nOptions: {
    messages: {
      en: {
        message: {
          welcome: 'Welcome!!!'
        }
      },
      de: {
        message: {
          welcome: 'Guten Tag!!!'
        }
      }
    }
  },
  template: `
    <div>
      {{$t('message.welcome')}}
    </div>`
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
