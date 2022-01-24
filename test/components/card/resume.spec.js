import { beforeEach, describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll } from '../../../jest/helpers/action'
import { attrExact, exist, see } from '../../../jest/helpers/expect'
import Resume from '@/components/Card/Resume'

describe('Resume', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(Resume, {
      propsData: {
        r_key: ''
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
            },
            $config: {
              WEB_URL: 'WEB_URL'
            },
            $dictionary: {
              dict: () => {}
            }
          }
        },
        dict: {
          title: () => {}
        },
        $domModal: {
          show: () => {}
        },
        resume: {
          key: 'golden_retriever',
          name: 'golden retriever',
          premium: false,
          released: '12/02/2021',
          first_nature: 'classic',
          nature: [
            'classic',
            'softly',
            'friendly'
          ],
          colors: [
            'yellow',
            'blue'
          ],
          avatar_url: '',
          preview_url: ''
        },
        avatar: 'https://avatar.test',
        resumeImg: 'https://resumeImg.test'
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should see name of resume', async function () {
    const name = 'this is name'
    wrapper.setData({ resume: { name } })
    await flushAll()
    see(wrapper.find('.card-resume--name'), name)
  })

  it('should see avatar of resume', async function () {
    const avatar = 'https://avatar.test'
    wrapper.setData({ resume: { avatar_url: avatar } })
    await flushAll()
    attrExact(wrapper.find('.card-resume--avatar'), 'src', avatar)
  })

  it('should see demo picture of resume', async function () {
    const resumeImg = 'https://resumeImg.test'
    wrapper.setData({ resume: { preview_url: resumeImg } })
    await flushAll()
    attrExact(wrapper.find('.card-resume--demo'), 'src', resumeImg)
  })

  it('should see all type color of resume', function () {
    wrapper.vm.resume.colors.forEach(c => exist(wrapper.find(`[paw-color=${c}]`), true))
  })

  it('should show premium note if resume is premium', async function () {
    wrapper.setData({ resume: { premium: false } })
    await flushAll()
    exist(wrapper.find('.card-resume--premium'), false)
    wrapper.setData({ resume: { premium: true } })
    await flushAll()
    exist(wrapper.find('.card-resume--premium'), true)
  })
})
