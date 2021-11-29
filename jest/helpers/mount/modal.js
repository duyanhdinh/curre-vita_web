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
          $content: () => {
          },
          $modal: {
            show: () => {
            },
            hide: () => {
            }
          },
          $recaptcha: {
            init: () => {
            },
            execute: () => {
            }
          },
          app: {
            i18n: {
              t: key => key
            }
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
