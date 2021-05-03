import Vue from 'vue'
import {ValidationObserver, ValidationProvider, extend, localize, configure} from 'vee-validate'
import vi from 'vee-validate/dist/locale/vi.json'
import * as rules from 'vee-validate/dist/rules'

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('vi', vi)

// configure({
//   classes: {
//     valid: 'is-valid', // model is valid
//     invalid: 'is-invalid', // model is invalid
//   }
// })

Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
