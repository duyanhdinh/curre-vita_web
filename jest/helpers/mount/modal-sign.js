import { mount } from '@vue/test-utils'
import { localValidate } from '../localVue/local-validate'
import { $store } from '../mocks/store'

const localVue = localValidate()

export function modalMount (component, response) {
  return mount(component, {
    mocks: {
      $nuxt: {
        context: {
          $api: {
            auth: {
              register: response,
              login: response
            }
          },
          $domModal: {
            setModalReady: () => {},
            hideAndRedirect: () => {},
            hideAndRedirectBack: () => {}
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
