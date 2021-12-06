import { describe, expect, it } from '@jest/globals'
import * as rules from 'vee-validate/dist/rules.umd'
import { extend } from 'vee-validate'
import flushPromises from 'flush-promises'
import { modalMount } from '../../../jest/helpers/mount/modal-sign'
import { click, flushAll } from '../../../jest/helpers/action'
import { canSee, containClass, exactValue } from '../../../jest/helpers/expect'
import SignIn from '@/components/Modal/SignIn'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

describe('SignIn', () => {
  let wrapper
  let email
  let password
  let submit

  it('should login success', async function () {
    await startEach(() => Promise.resolve({}))
    const spy = jest.spyOn(wrapper.vm, 'onSubmit')

    exactValue(email, '')
    exactValue(password, '')
    containClass(submit, 'disabled', true)

    email.setValue('email@email.com')
    password.setValue('12345678')
    await flushAll()

    exactValue(email, 'email@email.com')
    exactValue(password, '12345678')
    containClass(submit, 'disabled', false)

    await click(submit)

    expect(spy).toHaveBeenCalled()
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

  it('should can not create account when server error', async function () {
    await startEach(() => Promise.reject({}))

    await createErrors()
  })

  it('should can not create account when account not exist', async function () {
    await startEach(() => Promise.reject({
      data: {
        type: 'account_not_exist'
      }
    }))

    await createErrors()
  })

  /* see password */
  /* click link */

  /* helpers function */
  async function startEach (response) {
    wrapper = modalMount(SignIn, response)

    email = wrapper.find('#si-email')
    password = wrapper.find('#si-pass')
    submit = wrapper.find('#si-submit')

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  }

  async function inputSuccessValue () {
    await startEach(() => Promise.resolve())

    await expectSelectedContainClassesWhenSetValue(email, 'email@email.com', 'valid')

    await expectSelectedContainClassesWhenSetValueContinue(password, '12345678', 'valid')
  }

  async function expectSelectedContainClassesWhenSetValue (selector, value, classes = 'invalid') {
    containClass(selector, classes, false)

    await expectSelectedContainClassesWhenSetValueContinue(selector, value, classes)
  }

  async function expectSelectedContainClassesWhenSetValueContinue (selector, value, classes = 'invalid') {
    selector.setValue(value)
    await flushPromises()
    containClass(selector, classes, true)
  }

  async function createErrors () {
    email.setValue('email@email.com')
    password.setValue('12345678')
    await flushAll()

    containClass(submit, 'disabled', false)
    canSee(wrapper.find('.login-failed'), false)

    await click(submit)

    canSee(wrapper.find('.login-failed'), true)
  }
})
