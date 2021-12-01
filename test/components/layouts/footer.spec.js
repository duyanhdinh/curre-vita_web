import { describe, expect, it } from '@jest/globals'
import * as rules from 'vee-validate/dist/rules.umd'
import { extend } from 'vee-validate'
import { click, flushAll } from '@/jest/helpers/action'
import { exactValue } from '@/jest/helpers/expect'
import TheFooter from '@/components/layouts/TheFooter'
import { footerMount } from '@/jest/helpers/mount/footer'

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

describe('TheFooter', () => {
  let wrapper
  let email
  let opinion
  let send

  /* show logo */
  it('should send opinion success', async function () {
    await startEach(() => Promise.resolve({
      data: {
        message: 'success'
      }
    }))
    const spy = jest.spyOn(wrapper.vm, 'onSubmit')

    jest.useFakeTimers()
    jest.advanceTimersByTime(50)
    await flushAll()
    await flushAll()

    exactValue(email, '')
    exactValue(opinion, '')

    email.setValue('email@email.com')
    opinion.setValue('lorem issum')
    await flushAll()

    exactValue(email, 'email@email.com')
    exactValue(opinion, 'lorem issum')

    await click(send)
    expect(spy).toHaveBeenCalled()
  })

  /* helpers function */
  async function startEach (response) {
    wrapper = footerMount(TheFooter, response)

    email = wrapper.find('#contact-email')
    opinion = wrapper.find('#contact-opinion')
    send = wrapper.find('#contact-send')

    jest.useFakeTimers()
    await flushAll()
    await flushAll()
  }
})
