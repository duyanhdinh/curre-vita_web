import { beforeEach, describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll } from '../../../jest/helpers/action'
import { see } from '../../../jest/helpers/expect'
import WrapText from '@/components/Wrap/Text'

const div = document.createElement('div')
div.id = 'root'
document.body.appendChild(div)

describe('WrapText', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(WrapText, {
      attachTo: '#root',
      propsData: {
        info: {},
        canEnter: true,
        contentEditable: true,
        text: ''
      },
      mocks: {
        $nuxt: {
          context: {
            $resume: {
              getByKey: () => {},
              edit: {
                info: {
                  all: () => {}
                },
                personal: {
                  all: () => {}
                }
              },
              output: {
                getMode: () => {}
              },
              color: {
                origin: k => k,
                gradientNature: k => k
              }
            }
          }
        }
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should show text prop in', async function () {
    const text = 'a ka ha ma'
    wrapper.setProps({ text })
    await flushAll()

    see(wrapper, text)
  })
})
