import { mount } from '@vue/test-utils'
import { localValidate } from '../localVue/local-validate'
import { $store } from '../mocks/store'

const localVue = localValidate()

export function modalMount (component, response) {
  return mount(component, {
    mocks: {
      $nuxt: {
        context: {
          $axios: {
            post: response
          },
          $dictionary: {
            getDict: () => {}
          },
          $modal: {
            show: () => {},
            hide: () => {}
          },
          $recaptcha: {
            init: () => {},
            execute: () => {}
          }
        }
      },
      dict: {
        title: key => key,
        message: key => key
      },
      $store
    },
    stubs: {
      modal: true
    },
    localVue
  })
}
