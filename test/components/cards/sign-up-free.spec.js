import { beforeEach, describe, expect, it } from '@jest/globals'
import { createLocalVue, mount } from '@vue/test-utils'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules.umd.js'
import flushPromises from 'flush-promises'
import { attrExact, canSee, click, containClass, flushAll, see } from '../../../jest/helper'
import ModalSignUpFree from '@/components/Modal/SignUpFree'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

const localVue = createLocalVue()
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

describe('SignUpFree', () => {
  let wrapper
  let email
  let password
  let confirmedPassword
  let submit

  beforeEach(() => {})

  it('can create account', async () => {
    startEach(() => Promise.resolve({
      data: {
        message: 'success'
      }
    }))
    const spy = jest.spyOn(wrapper.vm, 'onSubmit')

    jest.useFakeTimers()
    jest.advanceTimersByTime(50)
    await flushAll()
    await flushAll()

    see(email, '')
    see(password, '')
    see(confirmedPassword, '')
    containClass(submit, 'disabled', true)

    email.setValue('email@email.com')
    password.setValue('12345678')
    confirmedPassword.setValue('12345678')
    await flushAll()

    see(email, 'email@email.com')
    see(password, '12345678')
    see(confirmedPassword, '12345678')
    containClass(submit, 'disabled', false)
    canSee(wrapper.find('.create-success'), false)

    await click(submit)

    expect(spy).toHaveBeenCalled()
    canSee(wrapper.find('.create-success'), true)
  })

  it('should show error when email is empty', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValue(email, '')
  })

  it('should show error when input value not equal a valid email', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValue(email, 'gmail')

    await expectSelectedContainClassesWhenSetValueContinue(email, 'a.com')

    await expectSelectedContainClassesWhenSetValueContinue(email, 'a@a')
  })

  it('should show error when password is empty', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValue(password, '')
  })

  it('should show error when password is shorter than 6 or longer than 20', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValue(password, '12345')

    await expectSelectedContainClassesWhenSetValueContinue(password, '123451234512345123451')
  })

  it('should show error when confirm password is empty', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValueContinue(confirmedPassword, '')
  })

  it('should show error when confirm password is not the same password', async function () {
    await inputSuccessValue()

    await expectSelectedContainClassesWhenSetValueContinue(confirmedPassword, '1234567', 'invalid')
  })

  it('should can not create account when email already exist in database', async function () {
    startEach(() => Promise.reject({
      data: {
        type: 'email_exist'
      }
    }))

    await createErrors()
  })

  it('should can not create account when server error', async function () {
    startEach(() => Promise.reject({}))

    await createErrors()
  })

  it('should show value of password when click view', async function () {
    await inputSuccessValue()

    attrExact(password, 'type', 'password')

    await click(wrapper.find('#su-see-pass'))

    attrExact(password, 'type', 'text')

    await click(wrapper.find('#su-see-pass'))

    attrExact(password, 'type', 'password')
  })

  it('should show value of confirm password when click view', async function () {
    await inputSuccessValue()

    attrExact(confirmedPassword, 'type', 'password')

    await click(wrapper.find('#su-see-conf-pass'))

    attrExact(confirmedPassword, 'type', 'text')

    await click(wrapper.find('#su-see-conf-pass'))

    attrExact(confirmedPassword, 'type', 'password')
  })

  it('should call function open sign in modal', async function () {
    startEach(() => Promise.resolve())

    const spy = jest.spyOn(wrapper.vm, 'openSignIn')
    await click(wrapper.find('#su-open-si'))

    expect(spy).toHaveBeenCalled()
  })

  it('should call function open forget password modal', async function () {
    startEach(() => Promise.resolve())

    const spy = jest.spyOn(wrapper.vm, 'openForgetPassword')
    await click(wrapper.find('#su-open-fp'))

    expect(spy).toHaveBeenCalled()
  })

  /* helper function */
  function startEach (response) {
    wrapper = mount(ModalSignUpFree, {
      mocks: {
        $nuxt: {
          context: {
            $axios: {
              post: response
            },
            $content: () => {},
            $modal: {
              show: () => {},
              hide: () => {}
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

    email = wrapper.find('#su-email')
    password = wrapper.find('#su-pass')
    confirmedPassword = wrapper.find('#su-conf-pass')
    submit = wrapper.find('#su-submit')
  }

  async function expectSelectedContainClassesWhenSetValue (selector, value, classes = 'invalid') {
    jest.useFakeTimers()
    jest.advanceTimersByTime(50)
    await flushAll()
    await flushAll()

    containClass(selector, classes, false)

    await expectSelectedContainClassesWhenSetValueContinue(selector, value, classes)
  }

  async function expectSelectedContainClassesWhenSetValueContinue (selector, value, classes = 'invalid') {
    selector.setValue(value)
    await flushPromises()
    containClass(selector, classes, true)
  }

  async function inputSuccessValue () {
    startEach(() => Promise.resolve())

    await expectSelectedContainClassesWhenSetValue(email, 'email@email.com', 'valid')

    await expectSelectedContainClassesWhenSetValueContinue(password, '12345678', 'valid')

    await expectSelectedContainClassesWhenSetValueContinue(confirmedPassword, '12345678', 'valid')
  }

  async function createErrors () {
    jest.useFakeTimers()
    jest.advanceTimersByTime(50)
    await flushAll()
    await flushAll()

    email.setValue('email@email.com')
    password.setValue('12345678')
    confirmedPassword.setValue('12345678')
    await flushAll()

    containClass(submit, 'disabled', false)
    canSee(wrapper.find('.create-failed'), false)

    await click(submit)

    canSee(wrapper.find('.create-failed'), true)
  }
})
