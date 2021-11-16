import { expect } from '@jest/globals'
import flushPromises from 'flush-promises'

export function see (selector, body) {
  expect(selector.element.value).toBe(body)
}

export function canSee (selector, expected) {
  expect(selector.isVisible()).toBe(expected)
}

export function containClass (selector, classes, expected) {
  expect(selector.classes(classes)).toBe(expected)
}

export function attrExact (selector, attr, expected) {
  expect(selector.attributes(attr)).toBe(expected)
}

export async function click (selector) {
  selector.trigger('click')
  await flushPromises()
}

export async function flushAll () {
  // get rid of any pending validations on the leading edge
  await flushPromises()
  // any delayed or debounced state computations
  jest.runAllTimers()
  // get rid of the pending rendering tick
  await flushPromises()
}
