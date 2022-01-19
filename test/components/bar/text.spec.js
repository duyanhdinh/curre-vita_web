import { beforeEach, describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll } from '../../../jest/helpers/action'
import { containClass } from '../../../jest/helpers/expect'
import ResumeOption from '@/components/Bar/ResumeOption'

describe('ResumeOption', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(ResumeOption, {
      mocks: {
        $nuxt: {
          context: {
            $dictionary: {
              dict: () => true
            },
            $html2pdf: {
              view: () => {},
              download: () => {}
            },
            $resumeEdit: {
              getInfo: () => {},
              getPrintMode: () => {},
              updatePersonalColor: () => {},
              updatePersonalFontFamily: () => {},
              getColorOrigin: () => {}
            }
          }
        },
        dict: {
          title: k => k,
          message: k => k
        },
        info: {
          colors: [
            'silver',
            'red',
            'blue'
          ],
          personal: {
            color: 'red',
            font_family: 'font-ui'
          }
        },
        $resumeEdit: {
          getColorOrigin: () => {}
        }
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should highlight color picker', async function () {
    wrapper.setData({
      info: {
        colors: [
          'silver',
          'red',
          'blue'
        ],
        personal: {
          color: 'red',
          font_family: 'font-ui'
        }
      }
    })
    await flushAll()

    containClass(wrapper.find('[paw-color=silver]'), 'opacity-40', true)
    containClass(wrapper.find('[paw-color=red]'), 'opacity-40', false)
    containClass(wrapper.find('[paw-color=blue]'), 'opacity-40', true)
  })
})
