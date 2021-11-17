import {mount} from "@vue/test-utils";
import {localValidate} from "../localVue/local-validate";

const localVue = localValidate()

export function modalMount(component, response) {
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
      text: {
        title: key => key,
        message: key => key
      }
    },
    stubs: {
      modal: true
    },
    localVue
  })
}
