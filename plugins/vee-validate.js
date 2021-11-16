import Vue from 'vue'
import { configure, extend, ValidationObserver, ValidationProvider } from 'vee-validate'
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as rules from 'vee-validate/dist/rules'

/* components */
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

export default function VeeValidatePlugin ({ app }) {
  configure({
    // defaultMessage: (_, values) => app.i18n.t(`validations.messages.${values._rule_}`, values)

    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`validations.fields.${field}`)
      return app.i18n.t(`validations.messages.${values._rule_}`, values)
    }
  })
}
