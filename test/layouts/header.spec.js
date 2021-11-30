import { describe, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { flushAll } from '../../jest/helpers/action'
import { canSee, exist } from '../../jest/helpers/expect'
import TheHeader from '@/components/layouts/TheHeader'

describe('TheHeader', () => {
  let wrapper

  /* show logo */
  it('should see the logo when not login', async function () {
    await startEach(false)

    canSee(wrapper.find('.logo'), true)
  })

  it('should see the logo when login', async function () {
    await startEach(true)

    canSee(wrapper.find('.logo'), true)
  })

  it('should see sign up button when not login', async function () {
    await startEach(false)

    exist(wrapper.find('#h-su'), true)
  })

  it('should see sign in button when not login', async function () {
    await startEach(false)

    exist(wrapper.find('#h-si'), true)
  })

  it('should can not see avatar when not login', async function () {
    await startEach(false)

    exist(wrapper.find('#h-avatar'), false)
  })

  it('should see sign up button when login', async function () {
    await startEach(true)

    exist(wrapper.find('#h-su'), false)
  })

  it('should see sign in button when login', async function () {
    await startEach(true)

    exist(wrapper.find('#h-si'), false)
  })

  it('should can not see avatar when login', async function () {
    await startEach(true)

    exist(wrapper.find('#h-avatar'), true)
  })

  /* helpers function */
  async function startEach (loggedIn) {
    wrapper = mount(TheHeader, {
      stubs: {
        Logo: true,
        AccountListMenu: true
      },
      mocks: {
        $nuxt: {
          context: {
            $dictionary: {
              getDict: () => {}
            }
          }
        },
        dict: {
          title: key => key,
          message: key => key
        },
        router: {
          push: key => key
        },
        $auth: {
          loggedIn
        }
      }
    })

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  }
})
