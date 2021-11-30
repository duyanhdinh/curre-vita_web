import { mount } from '@vue/test-utils'
import { localValidate } from '../localVue/local-validate'

const localVue = localValidate()

export function footerMount (component, response) {
  return mount(component, {
    stubs: {
      Logo: true,
      AccountListMenu: true
    },
    mocks: {
      $nuxt: {
        context: {
          $axios: {
            post: response
          },
          $dictionary: {},
          $recaptcha: {
            init: () => {},
            execute: () => {}
          }
        }
      },
      dict: {
        title: key => key,
        message: key => key
      }
    },
    localVue
  })
}
