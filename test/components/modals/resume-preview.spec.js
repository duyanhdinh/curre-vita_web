import { beforeEach, describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll } from '../../../jest/helpers/action'
import { attrExact, exist, see } from '../../../jest/helpers/expect'
import ResumePreview from '@/components/Modal/ResumePreview'

describe('ResumePreview', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(ResumePreview, {
      propsData: {
        r_key: ''
      },
      mocks: {
        $nuxt: {
          context: {
            $auth: {
              loggedIn: false
            },
            $resumeIaS: {
              getResume: () => {},
              getGradientColor: () => {}
            },
            $domModal: {
              setModalReady: () => {},
              hide: () => {},
              hideAndRedirect: () => {},
              hideAndRedirectBack: () => {}
            },
            $config: {
              WEB_URL: 'WEB_URL'
            },
            $dictionary: {
              dict: () => {}
            }
          }
        },
        $auth: {
          loggedIn: false
        },
        dict: {
          title: () => {},
          message: () => {}
        },
        $domModal: {
          show: () => {}
        },
        $resumeIaS: {
          getColorOrigin: () => {}
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
          ]
        },
        avatar: 'https://avatar.test',
        resumeImg: 'https://resumeImg.test'
      },
      stubs: {
        modal: true
      },
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  })

  it('should see name of resume', async function () {
    const name = 'this is name'
    wrapper.setData({ resume: { name: name } })
    await flushAll()
    see(wrapper.find('.reviewPreview-name'), name)
  })

  it('should see avatar of resume', async function () {
    const avatar = 'https://avatar.test'
    wrapper.setData({ avatar: avatar })
    await flushAll()
    attrExact(wrapper.find('.reviewPreview-avatar'), 'src', avatar)
  })

  it('should see demo picture of resume', async function () {
    const resumeImg = 'https://resumeImg.test'
    wrapper.setData({ resumeImg: resumeImg })
    await flushAll()
    attrExact(wrapper.find('.reviewPreview-demo'), 'src', resumeImg)
  })

  it('should see all type color of resume', function () {
    wrapper.vm.resume.colors.forEach(c => exist(wrapper.find(`[paw-color=${c}]`), true))
  })

  it('should show premium note if resume is premium', async function () {
    wrapper.setData({ resume: { premium: false } })
    await flushAll()
    exist(wrapper.find('.reviewPreview-premium'), false)
    wrapper.setData({ resume: { premium: true } })
    await flushAll()
    exist(wrapper.find('.reviewPreview-premium'), true)
  })

  it('should see login button when not sign in', async function () {
    wrapper.setData({
      $auth: {
        loggedIn: false
      },
      dict: {
        message: {
          button_choose: 'button_choose',
          not_sign: 'not_sign'
        }
      }
    })
    await flushAll()
    see(wrapper.find('.reviewPreview-button'), 'not_sign')
  });

  it('should see redirect to resume button when logged in', async function () {
    wrapper.setData({
      $auth: {
        loggedIn: true
      },
      dict: {
        message: {
          button_choose: 'button_choose',
          not_sign: 'not_sign'
        }
      }
    })
    await flushAll()
    see(wrapper.find('.reviewPreview-button'), 'button_choose')
  });
})
